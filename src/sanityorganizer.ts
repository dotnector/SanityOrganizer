import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { OrganizerRuntime } from "./app/contracts/OrganizerRuntime";
import { FolderNode } from "./app/domain/FolderNode";
import { ObjectCatalog } from "./app/domain/ObjectCatalog";
import { ObjectRecord } from "./app/domain/ObjectRecord";
import { OrganizerSettings } from "./app/domain/OrganizerSettings";
import { OrganizerState } from "./app/domain/OrganizerState";
import { ObjectQueryService } from "./app/services/ObjectQueryService";
import { ObjectSelectionService } from "./app/services/ObjectSelectionService";
import { OrganizerStateCloner } from "./app/services/OrganizerStateCloner";
import { OrganizerStateFactory } from "./app/services/OrganizerStateFactory";
import { OrganizerTreeService } from "./app/services/OrganizerTreeService";
import type { HaConnection } from "./ha/domain/HaConnection";
import { RuntimeResolver } from "./infrastructure/RuntimeResolver";

type DragPayload =
  | { kind: "folder"; folderId: string }
  | { kind: "object"; objectId: string; fromFolderId: string | null };

type FolderDialogState = {
  mode: "add" | "rename";
  folderId: string | null;
  parentId: string | null;
  name: string;
  icon: string;
};

type ConfirmDialogState = {
  title: string;
  message: string;
  action: { type: "delete-folder"; folderId: string };
};

type ContextAction =
  | { type: "rename-folder"; folderId: string }
  | { type: "delete-folder"; folderId: string }
  | { type: "add-folder"; folderId: string | null }
  | { type: "remove-object"; folderId: string; objectId: string };

const ROOT_DROP_ID = "__root__";

function uid(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}

@customElement("sanity-organizer")
export class SanityOrganizer extends LitElement {
  @property({ attribute: false }) public hass?: HaConnection;
  @property({ attribute: false }) public runtime?: OrganizerRuntime;

  @state() private organizerState: OrganizerState = new OrganizerStateFactory().createInitial();
  @state() private catalog: ObjectCatalog = new ObjectCatalog(new Map(), []);
  @state() private loading = true;
  @state() private saving = false;
  @state() private errorText = "";
  @state() private selectedFolderId: string | null = null;
  @state() private selectedObjectIds = new Set<string>();
  @state() private lastSelectedObjectId: string | null = null;
  @state() private search = "";
  @state() private showSettings = false;
  @state() private contextMenu:
    | { x: number; y: number; title: string; action: ContextAction }
    | null = null;
  @state() private folderDialog: FolderDialogState | null = null;
  @state() private confirmDialog: ConfirmDialogState | null = null;

  private initialized = false;
  private refreshTimerId: number | null = null;
  private readonly stateCloner = new OrganizerStateCloner();
  private readonly treeService = new OrganizerTreeService();
  private readonly queryService = new ObjectQueryService();
  private readonly selectionService = new ObjectSelectionService();
  private readonly runtimeResolver = new RuntimeResolver();

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.onGlobalClick);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.onGlobalClick);
    this.applyRefreshTimer(0);
  }

  protected override async updated(changedProps: Map<string, unknown>): Promise<void> {
    if (changedProps.has("hass") && this.hass && !this.runtime) {
      this.runtime = this.runtimeResolver.resolveFromHass(this.hass);
      return;
    }

    if (changedProps.has("runtime") && this.runtime && !this.initialized) {
      this.initialized = true;
      await this.initializePanel();
      this.applyRefreshTimer(this.settings.autoRefreshSeconds);
    }
  }

  private get settings(): OrganizerSettings {
    return this.organizerState.settings;
  }

  private applyRefreshTimer(intervalSeconds: number): void {
    if (this.refreshTimerId !== null) {
      window.clearInterval(this.refreshTimerId);
      this.refreshTimerId = null;
    }
    if (intervalSeconds > 0) {
      this.refreshTimerId = window.setInterval(() => {
        void this.refreshCatalog();
      }, intervalSeconds * 1000);
    }
  }

  private async initializePanel(): Promise<void> {
    if (!this.runtime) {
      return;
    }
    this.loading = true;
    this.errorText = "";
    try {
      const [storedState, catalog] = await Promise.all([
        this.runtime.loadState(),
        this.runtime.loadObjectCatalog(),
      ]);
      this.organizerState = storedState;
      this.catalog = catalog;
      this.selectedFolderId = this.selectedFolderId ?? storedState.rootFolderIds[0] ?? null;
    } catch (error) {
      this.errorText = `Failed to load panel data: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      this.loading = false;
    }
  }

  private async refreshCatalog(): Promise<void> {
    if (!this.runtime) {
      return;
    }
    try {
      this.catalog = await this.runtime.loadObjectCatalog();
    } catch {
      // Keep the latest good catalog when background refresh fails.
    }
  }

  private async persistState(nextState: OrganizerState): Promise<void> {
    this.organizerState = nextState;
    if (!this.runtime) {
      return;
    }
    this.saving = true;
    try {
      await this.runtime.saveState(nextState);
      this.errorText = "";
    } catch (error) {
      this.errorText = `Failed to persist changes: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      this.saving = false;
    }
  }

  private mutateState(mutator: (draft: OrganizerState) => void): void {
    const draft = this.stateCloner.clone(this.organizerState);
    mutator(draft);
    void this.persistState(draft);
  }

  private isExpanded(folderId: string): boolean {
    return this.organizerState.expandedFolderIds.includes(folderId);
  }

  private toggleFolder(folderId: string): void {
    this.mutateState((draft) => {
      this.treeService.toggleExpanded(draft, folderId);
    });
  }

  private openAddFolderDialog(parentId: string | null): void {
    this.folderDialog = {
      mode: "add",
      folderId: null,
      parentId,
      name: "",
      icon: this.settings.defaultFolderIcon,
    };
  }

  private openRenameFolderDialog(folderId: string): void {
    const folder = this.organizerState.folders[folderId];
    if (!folder) {
      return;
    }
    this.folderDialog = {
      mode: "rename",
      folderId,
      parentId: folder.parentId,
      name: folder.name,
      icon: folder.icon,
    };
  }

  private onFolderDialogNameInput(event: Event): void {
    if (!this.folderDialog) {
      return;
    }
    this.folderDialog = { ...this.folderDialog, name: (event.target as HTMLInputElement).value };
  }

  private onFolderDialogIconInput(event: Event): void {
    if (!this.folderDialog) {
      return;
    }
    this.folderDialog = { ...this.folderDialog, icon: (event.target as HTMLInputElement).value };
  }

  private submitFolderDialog(): void {
    const dialog = this.folderDialog;
    if (!dialog) {
      return;
    }
    const name = dialog.name.trim();
    const icon = dialog.icon.trim() || this.settings.defaultFolderIcon;
    if (!name) {
      return;
    }

    if (dialog.mode === "add") {
      const folderId = uid("folder");
      this.mutateState((draft) => {
        this.treeService.createFolder(draft, dialog.parentId, folderId, name, icon);
      });
      this.selectedFolderId = folderId;
    } else if (dialog.folderId) {
      this.mutateState((draft) => {
        this.treeService.renameFolder(draft, dialog.folderId!, name, icon);
      });
    }

    this.folderDialog = null;
  }

  private requestDeleteFolder(folderId: string): void {
    const folder = this.organizerState.folders[folderId];
    if (!folder) {
      return;
    }
    this.confirmDialog = {
      title: "Delete Folder",
      message: `Delete '${folder.name}' and all nested folders?`,
      action: { type: "delete-folder", folderId },
    };
  }

  private executeConfirmDialog(): void {
    const dialog = this.confirmDialog;
    this.confirmDialog = null;
    if (!dialog) {
      return;
    }
    if (dialog.action.type === "delete-folder") {
      const folderId = dialog.action.folderId;
      let removeIds = new Set<string>();
      this.mutateState((draft) => {
        removeIds = this.treeService.deleteFolder(draft, folderId);
      });
      if (this.selectedFolderId && removeIds.has(this.selectedFolderId)) {
        this.selectedFolderId = null;
      }
    }
  }

  private addObjectToFolder(folderId: string, object: ObjectRecord): void {
    this.mutateState((draft) => {
      this.treeService.addObjectToFolder(draft, folderId, object);
    });
  }

  private moveFolder(folderId: string, newParentId: string | null): void {
    this.mutateState((draft) => {
      this.treeService.moveFolder(draft, folderId, newParentId);
    });
  }

  private addSelectedObjectsToActiveFolder(): void {
    if (!this.selectedFolderId || this.selectedObjectIds.size === 0) {
      return;
    }
    const selectedFolderId = this.selectedFolderId;
    const objects = [...this.selectedObjectIds]
      .map((id) => this.catalog.byId.get(id))
      .filter((obj): obj is ObjectRecord => Boolean(obj));

    this.mutateState((draft) => {
      this.treeService.addObjectsToFolder(draft, selectedFolderId, objects);
    });
  }

  private removeObjectFromFolder(folderId: string, objectId: string): void {
    this.mutateState((draft) => {
      this.treeService.removeObjectFromFolder(draft, folderId, objectId);
    });
  }

  private getFilteredObjectIds(): string[] {
    return this.filteredObjects().map((entry) => entry.objectId);
  }

  private onSourceSelectClick(event: MouseEvent, objectId: string): void {
    event.stopPropagation();
    const orderedIds = this.getFilteredObjectIds();
    const next = this.selectionService.onRowClick(
      this.selectedObjectIds,
      orderedIds,
      objectId,
      this.lastSelectedObjectId,
      event.shiftKey,
      event.ctrlKey || event.metaKey,
    );
    this.selectedObjectIds = next;
    this.lastSelectedObjectId = objectId;
  }

  private onSourceCheckboxToggle(event: Event, objectId: string): void {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement).checked;
    const next = this.selectionService.onCheckboxToggle(this.selectedObjectIds, objectId, checked);
    this.selectedObjectIds = next;
    this.lastSelectedObjectId = objectId;
  }

  private onSourceKeyDown(event: KeyboardEvent): void {
    const isMetaSelectAll = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a";
    if (isMetaSelectAll) {
      event.preventDefault();
      this.selectedObjectIds = this.selectionService.selectAll(this.getFilteredObjectIds());
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      this.addSelectedObjectsToActiveFolder();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      if (this.contextMenu) {
        this.contextMenu = null;
        return;
      }
      if (this.selectedObjectIds.size > 0) {
        this.selectedObjectIds = new Set();
        return;
      }
      this.search = "";
    }
  }

  private onSearchInput(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }

  private onDragStart(event: DragEvent, payload: DragPayload): void {
    if (!event.dataTransfer) {
      return;
    }
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
  }

  private parseDropPayload(event: DragEvent): DragPayload | null {
    const raw = event.dataTransfer?.getData("application/json");
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as DragPayload;
    } catch {
      return null;
    }
  }

  private onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  private onDropToFolder(event: DragEvent, targetFolderId: string | null): void {
    event.preventDefault();
    const payload = this.parseDropPayload(event);
    if (!payload) {
      return;
    }

    if (payload.kind === "folder") {
      this.moveFolder(payload.folderId, targetFolderId);
      return;
    }

    if (payload.kind === "object") {
      if (!targetFolderId) {
        if (payload.fromFolderId) {
          this.removeObjectFromFolder(payload.fromFolderId, payload.objectId);
        }
        return;
      }
      const object = this.catalog.byId.get(payload.objectId);
      if (object) {
        this.addObjectToFolder(targetFolderId, object);
      }
    }
  }

  private showContextMenu(event: MouseEvent, title: string, action: ContextAction): void {
    event.preventDefault();
    this.contextMenu = {
      x: event.clientX,
      y: event.clientY,
      title,
      action,
    };
  }

  private onGlobalClick = (): void => {
    if (this.contextMenu) {
      this.contextMenu = null;
    }
  };

  private executeContextAction(): void {
    if (!this.contextMenu) {
      return;
    }
    const action = this.contextMenu.action;
    this.contextMenu = null;

    if (action.type === "rename-folder") {
      this.openRenameFolderDialog(action.folderId);
    } else if (action.type === "delete-folder") {
      this.requestDeleteFolder(action.folderId);
    } else if (action.type === "add-folder") {
      this.openAddFolderDialog(action.folderId);
    } else if (action.type === "remove-object") {
      this.removeObjectFromFolder(action.folderId, action.objectId);
    }
  }

  private filteredObjects(): ObjectRecord[] {
    return this.queryService.filterCatalog(this.catalog, this.search, this.settings);
  }

  private folderObjects(folder: FolderNode): ObjectRecord[] {
    return this.queryService.folderObjects(folder, this.catalog, this.search, this.settings);
  }

  private onSortModeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const sortMode = value === "name" ? "name" : "typeThenName";
    this.mutateState((draft) => {
      draft.settings.sortMode = sortMode;
    });
  }

  private onDefaultIconChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim() || "mdi:folder-outline";
    this.mutateState((draft) => {
      draft.settings.defaultFolderIcon = value;
    });
  }

  private onAutoRefreshChange(event: Event): void {
    const raw = Number((event.target as HTMLInputElement).value);
    const nextSeconds = Math.max(0, Math.min(600, Number.isFinite(raw) ? Math.round(raw) : 60));
    this.mutateState((draft) => {
      draft.settings.autoRefreshSeconds = nextSeconds;
    });
    this.applyRefreshTimer(nextSeconds);
  }

  private renderFolderTree(folderId: string, depth = 0): TemplateResult | typeof nothing {
    const folder = this.organizerState.folders[folderId];
    if (!folder) {
      return nothing;
    }
    const expanded = this.isExpanded(folderId);
    const selected = this.selectedFolderId === folderId;

    return html`
      <div
        class="folder-row ${selected ? "selected" : ""}"
        style=${`--depth:${depth}`}
        draggable="true"
        @dragstart=${(e: DragEvent) => this.onDragStart(e, { kind: "folder", folderId })}
        @dragover=${this.onDragOver}
        @drop=${(e: DragEvent) => this.onDropToFolder(e, folderId)}
        @click=${() => {
          this.selectedFolderId = folderId;
        }}
        @contextmenu=${(e: MouseEvent) =>
          this.showContextMenu(e, folder.name, { type: "rename-folder", folderId })}
      >
        <button
          class="icon-button"
          @click=${(e: Event) => {
            e.stopPropagation();
            this.toggleFolder(folderId);
          }}
        >
          <ha-icon .icon=${expanded ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
        </button>
        <ha-icon class="folder-icon" .icon=${folder.icon}></ha-icon>
        <span class="folder-name">${folder.name}</span>
        <span class="folder-count">${folder.objects.length}</span>
      </div>
      ${expanded
        ? html`${folder.children.map((childId) => this.renderFolderTree(childId, depth + 1))}`
        : nothing}
    `;
  }

  private renderContextMenu() {
    if (!this.contextMenu) {
      return nothing;
    }
    const action = this.contextMenu.action;
    return html`
      <div class="menu-backdrop" @click=${this.onGlobalClick}></div>
      <div class="menu" style=${`top:${this.contextMenu.y}px;left:${this.contextMenu.x}px`}>
        <div class="menu-title">${this.contextMenu.title}</div>
        ${action.type === "rename-folder" || action.type === "delete-folder"
          ? html`
              <button class="menu-item" @click=${() => this.openRenameFolderDialog(action.folderId)}>Rename folder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(action.folderId)}>Add subfolder</button>
              <button class="menu-item danger" @click=${() => this.requestDeleteFolder(action.folderId)}>Delete folder</button>
            `
          : nothing}
        ${action.type === "add-folder"
          ? html`<button class="menu-item" @click=${() => this.openAddFolderDialog(action.folderId)}>Add folder</button>`
          : nothing}
        ${action.type === "remove-object"
          ? html`<button class="menu-item" @click=${() => this.executeContextAction()}>Remove from folder</button>`
          : nothing}
      </div>
    `;
  }

  private renderFolderDialog() {
    if (!this.folderDialog) {
      return nothing;
    }
    const title = this.folderDialog.mode === "add" ? "Create Folder" : "Rename Folder";
    const canSubmit = this.folderDialog.name.trim().length > 0;
    return html`
      <div class="dialog-backdrop" @click=${() => { this.folderDialog = null; }}>
        <div class="dialog-card" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${title}</h3>
          <label>
            Name
            <input
              class="dialog-input"
              .value=${this.folderDialog.name}
              @input=${this.onFolderDialogNameInput}
              placeholder="Folder name"
            />
          </label>
          <label>
            Icon
            <input
              class="dialog-input"
              .value=${this.folderDialog.icon}
              @input=${this.onFolderDialogIconInput}
              placeholder="mdi:folder-outline"
            />
          </label>
          <div class="dialog-actions">
            <button class="ha-btn" @click=${() => { this.folderDialog = null; }}>Cancel</button>
            <button class="ha-btn" ?disabled=${!canSubmit} @click=${() => this.submitFolderDialog()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderConfirmDialog() {
    if (!this.confirmDialog) {
      return nothing;
    }
    return html`
      <div class="dialog-backdrop" @click=${() => { this.confirmDialog = null; }}>
        <div class="dialog-card" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this.confirmDialog.title}</h3>
          <p>${this.confirmDialog.message}</p>
          <div class="dialog-actions">
            <button class="ha-btn" @click=${() => { this.confirmDialog = null; }}>Cancel</button>
            <button class="ha-btn danger-fill" @click=${() => this.executeConfirmDialog()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }

  protected override render() {
    if (!this.hass) {
      return html`<div class="panel-shell">Attach this panel inside Home Assistant.</div>`;
    }

    if (this.loading) {
      return html`
        <div class="panel-shell loading">
          <div class="spinner"></div>
          <div class="loading-text">Loading Sanity Organizer...</div>
        </div>
      `;
    }

    const selectedFolder = this.selectedFolderId
      ? this.organizerState.folders[this.selectedFolderId] || null
      : null;
    const visibleObjects = this.filteredObjects();

    return html`
      <div class="panel-shell">
        <header class="toolbar">
          <div class="title-wrap">
            <h1>Sanity Organizer</h1>
            <span class="subtitle">Virtual folders for Home Assistant references</span>
          </div>
          <div class="toolbar-actions">
            <button class="ha-btn" @click=${() => this.openAddFolderDialog(null)}>New Folder</button>
            <button class="ha-btn" @click=${() => this.showSettings = !this.showSettings}>Settings</button>
            <button class="ha-btn" @click=${() => void this.refreshCatalog()}>Refresh</button>
          </div>
        </header>

        ${this.showSettings
          ? html`
              <section class="settings-panel">
                <div class="pane-title">Panel Settings</div>
                <div class="settings-grid">
                  <label>
                    Default folder icon
                    <input
                      class="dialog-input"
                      .value=${this.settings.defaultFolderIcon}
                      @change=${this.onDefaultIconChange}
                    />
                  </label>
                  <label>
                    Sort mode
                    <select class="dialog-input" .value=${this.settings.sortMode} @change=${this.onSortModeChange}>
                      <option value="typeThenName">Type then Name</option>
                      <option value="name">Name only</option>
                    </select>
                  </label>
                  <label>
                    Auto-refresh seconds (0 to disable)
                    <input
                      class="dialog-input"
                      type="number"
                      min="0"
                      max="600"
                      step="1"
                      .value=${String(this.settings.autoRefreshSeconds)}
                      @change=${this.onAutoRefreshChange}
                    />
                  </label>
                </div>
              </section>
            `
          : nothing}

        ${this.errorText
          ? html`<div class="error-banner">${this.errorText}</div>`
          : nothing}

        <div class="search-row">
          <ha-icon class="search-icon" .icon=${"mdi:magnify"}></ha-icon>
          <input
            id="so-search"
            class="search-input"
            type="text"
            placeholder="Search folders and objects"
            .value=${this.search}
            @input=${this.onSearchInput}
          />
          <span class="status-pill">${this.saving ? "Saving..." : "Saved"}</span>
        </div>

        <section class="layout-grid">
          <aside
            class="tree-pane"
            @dragover=${this.onDragOver}
            @drop=${(e: DragEvent) => this.onDropToFolder(e, null)}
            @contextmenu=${(e: MouseEvent) =>
              this.showContextMenu(e, "Root", { type: "add-folder", folderId: null })}
          >
            <div class="pane-title">Folders</div>
            <div class="root-drop-zone" data-drop-id=${ROOT_DROP_ID}>Drop here to move folder to root</div>
            ${this.organizerState.rootFolderIds.length === 0
              ? html`<div class="empty">No folders yet. Create one to start organizing.</div>`
              : this.organizerState.rootFolderIds.map((folderId) => this.renderFolderTree(folderId))}
          </aside>

          <main class="content-pane">
            <section class="source-panel" tabindex="0" @keydown=${this.onSourceKeyDown}>
              <div class="pane-title">Available Objects</div>
              <div class="source-actions">
                <button
                  class="ha-btn"
                  ?disabled=${!this.selectedFolderId || this.selectedObjectIds.size === 0}
                  @click=${() => this.addSelectedObjectsToActiveFolder()}
                >
                  Add Selected to Folder
                </button>
                <span>${visibleObjects.length} items</span>
              </div>
              <div class="shortcut-hint">Shortcuts: Ctrl/Cmd+A select all, Shift+Click range, Enter add, Esc clear.</div>
              <div class="list">
                ${visibleObjects.map(
                  (object) => html`
                    <div
                      class="list-item ${this.selectedObjectIds.has(object.objectId) ? "selected" : ""}"
                      draggable="true"
                      @dragstart=${(e: DragEvent) =>
                        this.onDragStart(e, {
                          kind: "object",
                          objectId: object.objectId,
                          fromFolderId: null,
                        })}
                      @click=${(e: MouseEvent) => this.onSourceSelectClick(e, object.objectId)}
                    >
                      <input
                        type="checkbox"
                        .checked=${this.selectedObjectIds.has(object.objectId)}
                        @change=${(e: Event) => this.onSourceCheckboxToggle(e, object.objectId)}
                      />
                      <ha-icon .icon=${object.icon}></ha-icon>
                      <div>
                        <div>${object.displayName}</div>
                        <div class="meta">${object.type} - ${object.refId}</div>
                      </div>
                    </div>
                  `,
                )}
              </div>
            </section>

            <section class="folder-panel">
              <div class="pane-title">Folder Contents</div>
              ${selectedFolder
                ? html`
                    <div class="folder-header">
                      <ha-icon .icon=${selectedFolder.icon}></ha-icon>
                      <h2>${selectedFolder.name}</h2>
                    </div>
                    <div
                      class="drop-zone"
                      @dragover=${this.onDragOver}
                      @drop=${(e: DragEvent) => this.onDropToFolder(e, selectedFolder.id)}
                    >
                      Drop objects here
                    </div>
                    <div class="list">
                      ${this.folderObjects(selectedFolder).map(
                        (object) => html`
                          <div
                            class="list-item"
                            draggable="true"
                            @dragstart=${(e: DragEvent) =>
                              this.onDragStart(e, {
                                kind: "object",
                                objectId: object.objectId,
                                fromFolderId: selectedFolder.id,
                              })}
                            @contextmenu=${(e: MouseEvent) =>
                              this.showContextMenu(e, object.displayName, {
                                type: "remove-object",
                                folderId: selectedFolder.id,
                                objectId: object.objectId,
                              })}
                          >
                            <ha-icon .icon=${object.icon}></ha-icon>
                            <div>
                              <div>${object.displayName}</div>
                              <div class="meta">${object.type} - ${object.refId}</div>
                            </div>
                            <button
                              class="icon-button"
                              @click=${() => this.removeObjectFromFolder(selectedFolder.id, object.objectId)}
                            >
                              <ha-icon .icon=${"mdi:close"}></ha-icon>
                            </button>
                          </div>
                        `,
                      )}
                      ${this.folderObjects(selectedFolder).length === 0
                        ? html`<div class="empty">No objects in this folder.</div>`
                        : nothing}
                    </div>
                  `
                : html`<div class="empty">Select a folder to inspect and edit its contents.</div>`}
            </section>
          </main>
        </section>
      </div>
      ${this.renderContextMenu()}
      ${this.renderFolderDialog()}
      ${this.renderConfirmDialog()}
    `;
  }

  public static override styles = css`
    :host {
      --bg-1: var(--card-background-color, #ffffff);
      --bg-2: color-mix(in srgb, var(--card-background-color, #ffffff) 90%, var(--primary-color, #03a9f4));
      --line: var(--divider-color, #d8dde6);
      --text-main: var(--primary-text-color, #1f2937);
      --text-muted: var(--secondary-text-color, #6b7280);
      --accent: var(--primary-color, #03a9f4);
      display: block;
      color: var(--text-main);
      font: 400 14px/1.4 var(--paper-font-body1_-_font-family, "Segoe UI", sans-serif);
      min-height: 100%;
    }

    * {
      box-sizing: border-box;
    }

    .panel-shell {
      min-height: 100vh;
      padding: 16px;
      background: radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 30%),
        linear-gradient(180deg, var(--bg-2), var(--bg-1));
    }

    .loading {
      display: grid;
      place-items: center;
      gap: 12px;
    }

    .spinner {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 3px solid color-mix(in srgb, var(--accent) 25%, transparent);
      border-top-color: var(--accent);
      animation: spin 0.8s linear infinite;
    }

    .loading-text {
      color: var(--text-muted);
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }

    .title-wrap h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 12px;
    }

    .toolbar-actions {
      display: flex;
      gap: 8px;
    }

    .ha-btn {
      appearance: none;
      border: 1px solid color-mix(in srgb, var(--accent) 55%, var(--line));
      background: color-mix(in srgb, var(--accent) 8%, var(--bg-1));
      color: var(--text-main);
      border-radius: 10px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 600;
    }

    .ha-btn:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .danger-fill {
      border-color: color-mix(in srgb, var(--error-color, #db4437) 70%, var(--line));
      background: color-mix(in srgb, var(--error-color, #db4437) 18%, var(--bg-1));
      color: var(--error-color, #db4437);
    }

    .settings-panel {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: color-mix(in srgb, var(--bg-1) 97%, white);
      padding: 10px;
      margin-bottom: 12px;
    }

    .settings-grid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .settings-grid label {
      display: grid;
      gap: 6px;
      color: var(--text-muted);
      font-size: 12px;
    }

    .error-banner {
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 40%, transparent);
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, var(--bg-1));
      color: var(--error-color, #db4437);
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 12px;
    }

    .search-row {
      display: grid;
      grid-template-columns: 24px 1fr auto;
      gap: 8px;
      align-items: center;
      border: 1px solid var(--line);
      background: color-mix(in srgb, var(--bg-1) 96%, white);
      border-radius: 12px;
      padding: 8px 10px;
      margin-bottom: 12px;
    }

    .search-icon {
      color: var(--text-muted);
    }

    .search-input {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--text-main);
      font: inherit;
      outline: none;
    }

    .status-pill {
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 12px;
      color: var(--text-muted);
      border: 1px solid var(--line);
    }

    .layout-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 12px;
      min-height: calc(100vh - 160px);
    }

    .tree-pane,
    .source-panel,
    .folder-panel {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: color-mix(in srgb, var(--bg-1) 97%, white);
      padding: 10px;
    }

    .source-panel:focus {
      outline: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
      outline-offset: 2px;
    }

    .content-pane {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      min-height: 0;
    }

    .pane-title {
      margin: 0 0 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      font-weight: 700;
    }

    .root-drop-zone,
    .drop-zone {
      border: 1px dashed color-mix(in srgb, var(--accent) 55%, var(--line));
      border-radius: 8px;
      padding: 8px;
      color: var(--text-muted);
      font-size: 12px;
      margin-bottom: 8px;
      text-align: center;
    }

    .folder-row {
      --pad: calc(var(--depth) * 14px);
      display: grid;
      grid-template-columns: 24px 22px 1fr auto;
      align-items: center;
      gap: 6px;
      margin: 2px 0;
      padding: 6px;
      padding-left: calc(6px + var(--pad));
      border-radius: 8px;
      cursor: pointer;
    }

    .folder-row:hover,
    .folder-row.selected {
      background: color-mix(in srgb, var(--accent) 14%, transparent);
    }

    .folder-count {
      color: var(--text-muted);
      font-size: 12px;
    }

    .icon-button {
      appearance: none;
      border: 0;
      background: transparent;
      color: var(--text-muted);
      display: grid;
      place-items: center;
      cursor: pointer;
      width: 22px;
      height: 22px;
      border-radius: 6px;
    }

    .icon-button:hover {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
    }

    .source-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      gap: 8px;
    }

    .shortcut-hint {
      color: var(--text-muted);
      font-size: 12px;
      margin-bottom: 8px;
    }

    .list {
      max-height: calc(100vh - 290px);
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .list-item {
      display: grid;
      grid-template-columns: auto 20px 1fr auto;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 8px;
    }

    .list-item.selected {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      border-color: color-mix(in srgb, var(--accent) 40%, transparent);
    }

    .list-item:hover {
      border-color: var(--line);
    }

    .meta {
      color: var(--text-muted);
      font-size: 12px;
    }

    .folder-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .folder-header h2 {
      margin: 0;
      font-size: 18px;
    }

    .empty {
      padding: 16px;
      color: var(--text-muted);
      text-align: center;
    }

    .menu-backdrop,
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 20;
    }

    .menu {
      position: fixed;
      z-index: 21;
      min-width: 180px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--bg-1);
      box-shadow: 0 16px 28px rgba(0, 0, 0, 0.2);
      padding: 6px;
    }

    .menu-title {
      color: var(--text-muted);
      font-size: 12px;
      padding: 6px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 4px;
    }

    .menu-item {
      display: block;
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--text-main);
      text-align: left;
      padding: 8px;
      border-radius: 7px;
      cursor: pointer;
    }

    .menu-item:hover {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
    }

    .menu-item.danger {
      color: var(--error-color, #db4437);
    }

    .dialog-backdrop {
      background: rgba(0, 0, 0, 0.35);
      display: grid;
      place-items: center;
      padding: 12px;
    }

    .dialog-card {
      width: min(420px, 100%);
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--bg-1);
      padding: 14px;
      box-shadow: 0 20px 34px rgba(0, 0, 0, 0.22);
      display: grid;
      gap: 10px;
      z-index: 22;
    }

    .dialog-card h3 {
      margin: 0;
    }

    .dialog-card p {
      margin: 0;
      color: var(--text-muted);
    }

    .dialog-card label {
      display: grid;
      gap: 6px;
      color: var(--text-muted);
      font-size: 12px;
    }

    .dialog-input {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 8px 10px;
      color: var(--text-main);
      background: color-mix(in srgb, var(--bg-1) 96%, white);
      font: inherit;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    @media (max-width: 1180px) {
      .layout-grid {
        grid-template-columns: 1fr;
      }

      .content-pane {
        grid-template-columns: 1fr;
      }

      .list {
        max-height: 300px;
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
}
