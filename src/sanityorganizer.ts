import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { OrganizerRuntime } from "./app/contracts/OrganizerRuntime";
import { FolderNode } from "./app/domain/FolderNode";
import { HaItemCatalog } from "./app/domain/HaItemCatalog";
import { HaItem } from "./app/domain/HaItem";
import { OrganizerSettings } from "./app/domain/OrganizerSettings";
import { OrganizerState } from "./app/domain/OrganizerState";
import { HaItemQueryService } from "./app/services/HaItemQueryService";
import { HaItemSelectionService } from "./app/services/HaItemSelectionService";
import { OrganizerStateCloner } from "./app/services/OrganizerStateCloner";
import { OrganizerStateFactory } from "./app/services/OrganizerStateFactory";
import { OrganizerTreeService } from "./app/services/OrganizerTreeService";
import type { HaConnection } from "./ha/domain/HaConnection";
import { RuntimeResolver } from "./infrastructure/RuntimeResolver";
import { HomeAssistantOrganizerRuntime } from "./infrastructure/homeassistant/HomeAssistantOrganizerRuntime";
import { Logger } from "./infrastructure/Logger.ts";


type DragPayload =
  | { kind: "folder"; folderId: string }
  | { kind: "object"; itemKey: string; fromFolderId: string | null };

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
  | { type: "add-subfolder"; folderId: string }
  | { type: "add-root-folder" }
  | { type: "remove-object"; folderId: string; itemKey: string };

const ROOT_DROP_ID = "__root__";
const FALLBACK_MDI_PATHS: Record<string, string> = {
  "mdi:folder-outline": "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z",
  "mdi:magnify": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
  "mdi:close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  "mdi:devices": "M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z",
  "mdi:shape-outline": "M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z",
  "mdi:tune-variant": "M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z",
  "mdi:robot": "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z",
  "mdi:script-text-outline": "M15,20A1,1 0 0,0 16,19V4H8A1,1 0 0,0 7,5V16H5V5A3,3 0 0,1 8,2H19A3,3 0 0,1 22,5V6H20V5A1,1 0 0,0 19,4A1,1 0 0,0 18,5V9L18,19A3,3 0 0,1 15,22H5A3,3 0 0,1 2,19V18H13A2,2 0 0,0 15,20M9,6H14V8H9V6M9,10H14V12H9V10M9,14H14V16H9V14Z",
  "mdi:palette-outline": "M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z",
  "mdi:star-outline": "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  "mdi:silverware-fork-knife": "M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",
  "mdi:archive-outline": "M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M9.5 11H14.5C14.78 11 15 11.22 15 11.5V13H9V11.5C9 11.22 9.22 11 9.5 11M5 5V7H19V5H5Z",
  "mdi:alert-outline": "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",
};

function uid(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}

@customElement("sanity-organizer")

/**
Defines the main organizer web component including UI, interactions, and state orchestration.
 */
export class SanityOrganizer extends LitElement {
  private static readonly LOG_PREFIX = "[SanityOrganizer][UI]";
  @property({ attribute: false }) public hass?: HaConnection;
  @property({ attribute: false }) public runtime?: OrganizerRuntime;

  @state() private organizerState: OrganizerState = new OrganizerStateFactory().createInitial();
  @state() private catalog: HaItemCatalog = new HaItemCatalog(new Map(), []);
  @state() private loading = true;
  @state() private errorText = "";
  @state() private selectedFolderId: string | null = null;
  @state() private selectedObjectIds = new Set<string>();
  @state() private lastSelectedItemKey: string | null = null;
  @state() private search = "";
  @state() private showSettings = false;
  @state() private contextMenu:
    | { x: number; y: number; title: string; action: ContextAction }
    | null = null;
  @state() private folderDialog: FolderDialogState | null = null;
  @state() private confirmDialog: ConfirmDialogState | null = null;
  @state() private dragTargetFolderId: string | null = null;

  private initialized = false;
  private refreshTimerId: number | null = null;
  private readonly stateCloner = new OrganizerStateCloner();
  private readonly treeService = new OrganizerTreeService();
  private readonly queryService = new HaItemQueryService();
  private readonly selectionService = new HaItemSelectionService();
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

    if (changedProps.has("hass") && this.hass && this.runtime instanceof HomeAssistantOrganizerRuntime) {
      this.runtime.updateHass(this.hass);
    }

    if (changedProps.has("runtime") && this.runtime && !this.initialized) {
      this.initialized = true;
      await this.initializePanel();
      this.applyRefreshTimer(this.settings.autoRefreshSeconds);
    }

    const previousDialog = changedProps.get("folderDialog") as FolderDialogState | null | undefined;
    if (!previousDialog && this.folderDialog) {
      // Only run when the dialog opens, not on each keystroke.
      requestAnimationFrame(() => {
        const input = this.renderRoot?.querySelector<HTMLInputElement>("#folder-name-input");
        if (input) {
          input.focus();
          input.select();
        }
      });
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
    Logger.debug("----initializePanel----");
    Logger.debug("runtime", this.runtime);
    if (!this.runtime) {
      return;
    }
    Logger.debug(`${SanityOrganizer.LOG_PREFIX} initializePanel:start`);
    this.loading = true;
    this.errorText = "";
    Logger.debug("yes, please");
    try {
      const [storedState, catalog] = await Promise.all([
        this.runtime.loadState(),
        this.runtime.loadHaItemCatalog(),
      ]);
      this.organizerState = storedState;
      this.catalog = catalog;
      this.selectedFolderId = this.resolveSelectedFolderId(storedState, storedState.selectedFolderId);
      Logger.debug(`${SanityOrganizer.LOG_PREFIX} initializePanel:success`, {
        folderCount: Object.keys(storedState.folders).length,
        rootFolderCount: storedState.rootFolderIds.length,
        catalogItemCount: catalog.all.length,
        selectedFolderId: this.selectedFolderId,
      });
    } catch (error) {
      this.errorText = `Failed to load panel data: ${error instanceof Error ? error.message : String(error)}`;
      Logger.error(`${SanityOrganizer.LOG_PREFIX} initializePanel:error`, error);
    } finally {
      this.loading = false;
    }
  }

  private async refreshCatalog(): Promise<void> {
    if (!this.runtime) {
      return;
    }
    try {
      this.catalog = await this.runtime.loadHaItemCatalog();
    } catch {
      // Keep the latest good catalog when background refresh fails.
    }
  }

  private async persistState(nextState: OrganizerState): Promise<void> {
    this.organizerState = nextState;
    if (!this.runtime) {
      return;
    }
    Logger.debug(`${SanityOrganizer.LOG_PREFIX} persistState:start`, {
      folderCount: Object.keys(nextState.folders).length,
      rootFolderCount: nextState.rootFolderIds.length,
    });
    try {
      await this.runtime.saveState(nextState);
      this.errorText = "";
      Logger.debug(`${SanityOrganizer.LOG_PREFIX} persistState:success`);
    } catch (error) {
      this.errorText = `Failed to persist changes: ${error instanceof Error ? error.message : String(error)}`;
      Logger.error(`${SanityOrganizer.LOG_PREFIX} persistState:error`, error);
    } finally {
    }
  }

  private mutateState(mutator: (draft: OrganizerState) => void): void {
    const draft = this.stateCloner.clone(this.organizerState);
    mutator(draft);
    void this.persistState(draft);
  }

  private resolveSelectedFolderId(state: OrganizerState, preferredFolderId: string | null): string | null {
    if (preferredFolderId && state.folders[preferredFolderId]) {
      return preferredFolderId;
    }
    return state.rootFolderIds.find((folderId) => Boolean(state.folders[folderId])) ?? null;
  }

  private selectFolder(folderId: string | null): void {
    const nextFolderId = this.resolveSelectedFolderId(this.organizerState, folderId);
    this.selectedFolderId = nextFolderId;
    if (this.organizerState.selectedFolderId === nextFolderId) {
      return;
    }
    this.mutateState((draft) => {
      draft.selectedFolderId = this.resolveSelectedFolderId(draft, folderId);
    });
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
      icon: "mdi:folder-outline",
    };
  }

  private openNormalAddFolderDialog(): void {
    this.openAddFolderDialog(this.selectedFolderId ?? null);
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

  private onFolderDialogKeyDown(event: KeyboardEvent): void {
    if (!this.folderDialog) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.folderDialog = null;
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      this.submitFolderDialog();
    }
  }

  private submitFolderDialog(): void {
    const dialog = this.folderDialog;
    if (!dialog) {
      return;
    }
    const name = dialog.name.trim();
    const icon = dialog.icon.trim() || "mdi:folder-outline";
    if (!name) {
      return;
    }

    if (dialog.mode === "add") {
      const folderId = uid("folder");
      this.mutateState((draft) => {
        this.treeService.createFolder(draft, dialog.parentId, folderId, name, icon);
        draft.selectedFolderId = folderId;
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
    if (folder.objects.length === 0 && folder.children.length === 0) {
      let removeIds = new Set<string>();
      this.mutateState((draft) => {
        removeIds = this.treeService.deleteFolder(draft, folderId);
        if (draft.selectedFolderId && removeIds.has(draft.selectedFolderId)) {
          draft.selectedFolderId = this.resolveSelectedFolderId(draft, null);
        }
      });
      if (this.selectedFolderId && removeIds.has(this.selectedFolderId)) {
        this.selectedFolderId = this.resolveSelectedFolderId(this.organizerState, null);
      }
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
        if (draft.selectedFolderId && removeIds.has(draft.selectedFolderId)) {
          draft.selectedFolderId = this.resolveSelectedFolderId(draft, null);
        }
      });
      if (this.selectedFolderId && removeIds.has(this.selectedFolderId)) {
        this.selectedFolderId = this.resolveSelectedFolderId(this.organizerState, null);
      }
    }
  }

  private addObjectToFolder(folderId: string, object: HaItem): void {
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
      .filter((obj): obj is HaItem => Boolean(obj));

    this.mutateState((draft) => {
      this.treeService.addObjectsToFolder(draft, selectedFolderId, objects);
    });
    this.selectedObjectIds = new Set<string>();
    this.lastSelectedItemKey = null;
  }

  private removeObjectFromFolder(folderId: string, itemKey: string): void {
    this.mutateState((draft) => {
      this.treeService.removeObjectFromFolder(draft, folderId, itemKey);
    });
  }

  private editorPathFor(item: HaItem): string {
    if (item.type === "automation") {
      return item.editorId
        ? `/config/automation/edit/${encodeURIComponent(item.editorId)}`
        : `/config/automation/show/${encodeURIComponent(item.haId)}`;
    }
    if (item.type === "scene") {
      return item.editorId
        ? `/config/scene/edit/${encodeURIComponent(item.editorId)}`
        : `/history?entity_id=${encodeURIComponent(item.haId)}`;
    }
    if (item.type === "script") {
      return item.editorId
        ? `/config/script/edit/${encodeURIComponent(item.editorId)}`
        : `/config/script/show/${encodeURIComponent(item.haId)}`;
    }
    if (item.type === "device") {
      return `/config/devices/device/${encodeURIComponent(item.haId)}`;
    }
    if (item.type === "entity" || item.type === "helper") {
      return `/history?entity_id=${encodeURIComponent(item.haId)}`;
    }
    return "/config";
  }

  private editorTarget(): string {
    if (this.settings.openTarget === "this-tab") {
      return "_self";
    }
    if (this.settings.openTarget === "same-other-tab") {
      return "sanity_organizer";
    }
    return "_blank";
  }

  private editorRel(): string {
    return this.settings.openTarget === "new-tab" ? "noopener noreferrer" : "";
  }

  private onFolderItemNameClick(event: Event): void {
    event.stopPropagation();
  }

  private getFilteredObjectIds(): string[] {
    return this.filteredObjects().map((entry) => entry.itemKey);
  }

  private onSourceSelectClick(event: MouseEvent, itemKey: string): void {
    event.stopPropagation();
    const orderedIds = this.getFilteredObjectIds();
    const next = this.selectionService.onRowClick(
      this.selectedObjectIds,
      orderedIds,
      itemKey,
      this.lastSelectedItemKey,
      event.shiftKey,
      event.ctrlKey || event.metaKey,
    );
    this.selectedObjectIds = next;
    this.lastSelectedItemKey = itemKey;
  }

  private onSourceCheckboxToggle(event: Event, itemKey: string): void {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement).checked;
    const next = this.selectionService.onCheckboxToggle(this.selectedObjectIds, itemKey, checked);
    this.selectedObjectIds = next;
    this.lastSelectedItemKey = itemKey;
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

  private clearDragState(): void {
    this.dragTargetFolderId = null;
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

  private onFolderDragOver(event: DragEvent, targetFolderId: string): void {
    this.onDragOver(event);
    const payload = this.parseDropPayload(event);
    if (payload?.kind === "folder") {
      this.dragTargetFolderId = targetFolderId;
    }
  }

  private onFolderDragLeave(event: DragEvent, targetFolderId: string): void {
    const related = event.relatedTarget;
    if (related instanceof Node && (event.currentTarget as HTMLElement).contains(related)) {
      return;
    }
    if (this.dragTargetFolderId === targetFolderId) {
      this.dragTargetFolderId = null;
    }
  }

  private onDropToFolder(event: DragEvent, targetFolderId: string | null): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragTargetFolderId = null;
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
          this.removeObjectFromFolder(payload.fromFolderId, payload.itemKey);
        }
        return;
      }
      const object = this.catalog.byId.get(payload.itemKey);
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
      this.openNormalAddFolderDialog();
    } else if (action.type === "add-subfolder") {
      this.openAddFolderDialog(action.folderId);
    } else if (action.type === "add-root-folder") {
      this.openAddFolderDialog(null);
    } else if (action.type === "remove-object") {
      this.removeObjectFromFolder(action.folderId, action.itemKey);
    }
  }

  private filteredObjects(): HaItem[] {
    return this.queryService.filterCatalog(this.catalog, this.search, this.settings);
  }

  private folderObjects(folder: FolderNode): HaItem[] {
    return this.queryService.folderObjectsUnfiltered(folder, this.catalog, this.settings);
  }

  private onSortModeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const sortMode = value === "name" ? "name" : "typeThenName";
    this.mutateState((draft) => {
      draft.settings.sortMode = sortMode;
    });
  }

  private onOpenTargetChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const openTarget =
      value === "this-tab" || value === "same-other-tab" ? value : "new-tab";
    this.mutateState((draft) => {
      draft.settings.openTarget = openTarget;
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

  private renderIcon(icon: string, className = ""): TemplateResult {
    if (customElements.get("ha-icon")) {
      return className
        ? html`<ha-icon class=${className} .icon=${icon}></ha-icon>`
        : html`<ha-icon .icon=${icon}></ha-icon>`;
    }

    const path = FALLBACK_MDI_PATHS[icon] ?? FALLBACK_MDI_PATHS["mdi:folder-outline"];
    const classes = className ? `fallback-icon ${className}` : "fallback-icon";
    return html`
      <svg
        class=${classes}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d=${path}></path>
      </svg>
    `;
  }

  private renderFolderTree(folderId: string, depth = 0): TemplateResult | typeof nothing {
    const folder = this.organizerState.folders[folderId];
    if (!folder) {
      return nothing;
    }
    const hasChildren = folder.children.length > 0;
    const expanded = this.isExpanded(folderId);
    const selected = this.selectedFolderId === folderId;

    return html`
      <div class="tree-node" style=${`--depth:${depth}`}>
        <div
          class="folder-row ${selected ? "selected" : ""} ${this.dragTargetFolderId === folderId ? "drop-target" : ""} ${depth === 0 ? "root" : "child"}"
          style=${`--depth:${depth}`}
          draggable="true"
          @dragstart=${(e: DragEvent) => this.onDragStart(e, { kind: "folder", folderId })}
          @dragend=${this.clearDragState}
          @dragover=${(e: DragEvent) => this.onFolderDragOver(e, folderId)}
          @dragleave=${(e: DragEvent) => this.onFolderDragLeave(e, folderId)}
          @drop=${(e: DragEvent) => this.onDropToFolder(e, folderId)}
          @click=${() => this.selectFolder(folderId)}
          @contextmenu=${(e: MouseEvent) => {
            e.stopPropagation();
            this.showContextMenu(e, folder.name, { type: "rename-folder", folderId });
          }}
        >
          ${hasChildren
            ? html`
                <button
                  class="tree-toggle"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this.toggleFolder(folderId);
                  }}
                  aria-label=${expanded ? "Collapse folder" : "Expand folder"}
                >
                  <span class="tree-toggle-glyph">${expanded ? "−" : "+"}</span>
                </button>
              `
            : html`<span class="tree-toggle-spacer" aria-hidden="true"></span>`}
          ${this.renderIcon(folder.icon, "folder-icon")}
          <span class="folder-name">${folder.name}</span>
          <span class="folder-count">${folder.objects.length}</span>
        </div>
        ${hasChildren && expanded
          ? html`<div class="tree-children" style=${`--depth:${depth}`}>
              ${[...folder.children]
                .sort((leftId, rightId) => {
                  const left = this.organizerState.folders[leftId];
                  const right = this.organizerState.folders[rightId];
                  return (left?.name ?? "").localeCompare(right?.name ?? "", undefined, {
                    sensitivity: "base",
                  });
                })
                .map((childId) => this.renderFolderTree(childId, depth + 1))}
            </div>`
          : nothing}
      </div>
    `;
  }

  private renderContextMenu() {
    if (!this.contextMenu) {
      return nothing;
    }
    const action = this.contextMenu.action;
    Logger.debug("action.type", action.type);
    return html`
      <div class="menu-backdrop" @click=${this.onGlobalClick}></div>
      <div class="menu" style=${`top:${this.contextMenu.y}px;left:${this.contextMenu.x}px`}>
        <div class="menu-title">${this.contextMenu.title}</div>
        ${action.type === "rename-folder" || action.type === "delete-folder"
          ? html`
              <button class="menu-item" @click=${() => this.openRenameFolderDialog(action.folderId)}>Rename folder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(action.folderId)}>Add subfolder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>
              <button class="menu-item danger" @click=${() => this.requestDeleteFolder(action.folderId)}>Delete folder</button>
            `
          : nothing}
        ${action.type === "add-folder"
          ? html`
              <button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>
            `
          : nothing}
        ${action.type === "add-root-folder"
          ? html`<button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>`
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
        <div class="dialog-card" @click=${(e: Event) => e.stopPropagation()} @keydown=${this.onFolderDialogKeyDown}>
          <h3>${title}</h3>
          <label>
            Name
            <input
              id="folder-name-input"
              class="dialog-input"
              .value=${this.folderDialog.name}
              @input=${this.onFolderDialogNameInput}
              placeholder="Folder name"
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
    if (!this.runtime && !this.hass) {
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
            <button class="ha-btn" @click=${() => this.openNormalAddFolderDialog()}>New Folder</button>
            <button class="ha-btn" @click=${() => this.showSettings = !this.showSettings}>Settings</button>
            <button class="ha-btn" @click=${() => void this.refreshCatalog()}>Reload from HA</button>
          </div>
        </header>

        ${this.showSettings
          ? html`
              <section class="settings-panel">
                <div class="pane-title">Panel Settings</div>
                <div class="settings-grid">
                  <label>
                    Open items in
                    <select class="dialog-input" .value=${this.settings.openTarget} @change=${this.onOpenTargetChange}>
                      <option value="new-tab">New tab</option>
                      <option value="this-tab">This tab</option>
                      <option value="same-other-tab">Same other tab</option>
                    </select>
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
          ${this.renderIcon("mdi:magnify", "search-icon")}
          <input
            id="so-search"
            class="search-input"
            type="text"
            placeholder="Search folders and objects"
            .value=${this.search}
            @input=${this.onSearchInput}
          />
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
              : [...this.organizerState.rootFolderIds]
                  .sort((leftId, rightId) => {
                    const left = this.organizerState.folders[leftId];
                    const right = this.organizerState.folders[rightId];
                    return (left?.name ?? "").localeCompare(right?.name ?? "", undefined, {
                      sensitivity: "base",
                    });
                  })
                  .map((folderId) => this.renderFolderTree(folderId))}
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
                      class="list-item ${this.selectedObjectIds.has(object.itemKey) ? "selected" : ""}"
                      draggable="true"
                      @dragstart=${(e: DragEvent) =>
                        this.onDragStart(e, {
                          kind: "object",
                          itemKey: object.itemKey,
                          fromFolderId: null,
                        })}
                      @click=${(e: MouseEvent) => this.onSourceSelectClick(e, object.itemKey)}
                    >
                      <input
                        type="checkbox"
                        .checked=${this.selectedObjectIds.has(object.itemKey)}
                        @change=${(e: Event) => this.onSourceCheckboxToggle(e, object.itemKey)}
                      />
                      ${this.renderIcon(object.icon)}
                      <div>
                        <div>${object.displayName}</div>
                        <div class="meta">${object.type} - ${object.haId}</div>
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
                      <div class="folder-header-main">
                        ${this.renderIcon(selectedFolder.icon)}
                        <h2>${selectedFolder.name}</h2>
                      </div>
                      <button
                        class="ha-btn danger-fill"
                        @click=${() => this.requestDeleteFolder(selectedFolder.id)}
                      >
                        Delete Folder
                      </button>
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
                            class="list-item folder-object-item"
                            draggable="true"
                            @dragstart=${(e: DragEvent) =>
                              this.onDragStart(e, {
                                kind: "object",
                                itemKey: object.itemKey,
                                fromFolderId: selectedFolder.id,
                              })}
                            @contextmenu=${(e: MouseEvent) =>
                              this.showContextMenu(e, object.displayName, {
                                type: "remove-object",
                                folderId: selectedFolder.id,
                                itemKey: object.itemKey,
                              })}
                          >
                            ${this.renderIcon(object.icon)}
                            <div>
                              <div>
                                <a
                                  class="item-link"
                                  href=${this.editorPathFor(object)}
                                  target=${this.editorTarget()}
                                  rel=${this.editorRel()}
                                  @click=${(e: Event) => this.onFolderItemNameClick(e)}
                                >
                                  ${object.displayName}
                                </a>
                              </div>
                              <div class="meta">${object.type} - ${object.haId}</div>
                            </div>
                            <button
                              class="icon-button"
                              @click=${() => this.removeObjectFromFolder(selectedFolder.id, object.itemKey)}
                            >
                              ${this.renderIcon("mdi:close")}
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

    .fallback-icon {
      width: 20px;
      height: 20px;
      display: block;
      fill: currentColor;
      color: inherit;
      flex: 0 0 auto;
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
      --pad: calc(var(--depth) * 10px);
      position: relative;
      display: grid;
      grid-template-columns: 24px 22px 1fr auto;
      align-items: center;
      gap: 6px;
      margin: 2px 0;
      padding: 6px;
      padding-left: calc(2px + var(--pad));
      border-radius: 8px;
      cursor: pointer;
    }

    .tree-node {
      position: relative;
    }

    .tree-children {
      position: relative;
    }

    .tree-toggle {
      appearance: none;
      border: 1px solid color-mix(in srgb, var(--line) 75%, transparent);
      background: color-mix(in srgb, var(--bg-1) 92%, white);
      color: var(--text-main);
      display: grid;
      place-items: center;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
    }

    .tree-toggle:hover {
      border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
      background: color-mix(in srgb, var(--accent) 8%, var(--bg-1));
    }

    .tree-toggle-glyph {
      font-size: 14px;
      line-height: 1;
      font-weight: 700;
      transform: translateY(-1px);
    }

    .tree-toggle-spacer {
      display: inline-block;
      width: 18px;
      height: 18px;
    }

    .folder-row:hover,
    .folder-row.selected {
      background: color-mix(in srgb, var(--accent) 14%, transparent);
    }

    .folder-row.drop-target {
      background: color-mix(in srgb, var(--accent) 22%, transparent);
      outline: 1px solid color-mix(in srgb, var(--accent) 65%, var(--line));
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

    .folder-object-item {
      grid-template-columns: 20px 1fr auto;
    }

    .item-link {
      appearance: none;
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      color: var(--accent);
      cursor: pointer;
      font: inherit;
      text-align: left;
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }

    .item-link:hover {
      color: color-mix(in srgb, var(--accent) 80%, var(--text-main));
    }

    .meta {
      color: var(--text-muted);
      font-size: 12px;
    }

    .folder-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }

    .folder-header-main {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
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
