import { FolderNode } from "../domain/FolderNode";
import { FolderHaItemRef } from "../domain/FolderHaItemRef";
import { HaItemType, type HaItemTypeValue } from "../domain/HaItemType";
import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";
import { OrganizerStateFactory } from "./OrganizerStateFactory";

/**
 * Validates and normalizes stored data into a safe organizer state instance.
 */
export class OrganizerStateSanitizer {
  private readonly factory: OrganizerStateFactory;

  public constructor() {
    this.factory = new OrganizerStateFactory();
  }

  public sanitize(value: unknown): OrganizerState {
    const defaults = this.factory.createInitial();

    // If persisted payload is unusable, return a known-good baseline.
    if (!this.isObject(value)) {
      return defaults;
    }

    // Normalize top-level collections. Invalid shapes become empty.
    const foldersValue = this.isObject(value.folders) ? value.folders : {};
    const rootFolderIds = this.isStringArray(value.rootFolderIds) ? value.rootFolderIds : [];
    const expandedFolderIds = this.isStringArray(value.expandedFolderIds)
      ? value.expandedFolderIds
      : [];

    // Clamp settings to safe values so corrupted storage does not break runtime behavior.
    const rawSettings = this.isObject(value.settings) ? value.settings : {};
    const sortMode = rawSettings.sortMode === "name" ? "name" : defaults.settings.sortMode;
    const autoRefreshSecondsRaw =
      typeof rawSettings.autoRefreshSeconds === "number" && Number.isFinite(rawSettings.autoRefreshSeconds)
        ? Math.round(rawSettings.autoRefreshSeconds)
        : defaults.settings.autoRefreshSeconds;
    const autoRefreshSeconds = Math.max(0, Math.min(600, autoRefreshSecondsRaw));
    const openTarget =
      rawSettings.openTarget === "this-tab" || rawSettings.openTarget === "same-other-tab"
        ? rawSettings.openTarget
        : defaults.settings.openTarget;

    // Rebuild folders entry-by-entry and coerce each field into a valid shape.
    const folders: Record<string, FolderNode> = {};
    for (const [id, rawFolder] of Object.entries(foldersValue)) {
      if (!this.isObject(rawFolder)) {
        continue;
      }

      const name =
        typeof rawFolder.name === "string" && rawFolder.name.trim() ? rawFolder.name : "Folder";
      const icon =
        typeof rawFolder.icon === "string" && rawFolder.icon.trim()
          ? rawFolder.icon
          : "mdi:folder-outline";
      const parentId = typeof rawFolder.parentId === "string" ? rawFolder.parentId : null;
      const children = this.isStringArray(rawFolder.children) ? rawFolder.children : [];
      const rawObjects = Array.isArray(rawFolder.objects) ? rawFolder.objects : [];

      // Keep only object refs with valid IDs and a recognized type.
      const objects = rawObjects
        .filter((obj) => this.isObject(obj))
        .map((obj) => {
          const itemKey =
            typeof obj.itemKey === "string"
              ? obj.itemKey
              : typeof obj.objectId === "string"
                ? obj.objectId
                : "";
          const haId =
            typeof obj.haId === "string"
              ? obj.haId
              : typeof obj.refId === "string"
                ? obj.refId
                : "";
          const type = this.parseObjectType(obj.type);
          return new FolderHaItemRef(itemKey, type, haId);
        })
        .filter((obj) => obj.itemKey.length > 0 && obj.haId.length > 0);

      folders[id] = new FolderNode(id, name, icon, parentId, children, objects);
    }

    return new OrganizerState(
      folders,
      rootFolderIds,
      expandedFolderIds,
      new OrganizerSettings(sortMode, autoRefreshSeconds, openTarget),
    );
  }

  // Unknown values default to Entity to preserve backward compatibility with older/bad payloads.
  private parseObjectType(value: unknown): HaItemTypeValue {
    switch (value) {
      case HaItemType.Device:
      case HaItemType.Entity:
      case HaItemType.Helper:
      case HaItemType.Automation:
      case HaItemType.Script:
      case HaItemType.Scene:
        return value;
      default:
        return HaItemType.Entity;
    }
  }

  private isObject(value: unknown): value is Record<string, any> {
    return typeof value === "object" && value !== null;
  }

  private isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((entry) => typeof entry === "string");
  }
}
