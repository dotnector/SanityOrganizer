/// <summary>
/// Validates and normalizes stored data into a safe organizer state instance.
/// </summary>
import { FolderNode } from "../domain/FolderNode";
import { FolderObjectRef } from "../domain/FolderObjectRef";
import { ObjectType, type ObjectTypeValue } from "../domain/ObjectType";
import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";
import { OrganizerStateFactory } from "./OrganizerStateFactory";

export class OrganizerStateSanitizer {
  private readonly factory: OrganizerStateFactory;

  public constructor() {
    this.factory = new OrganizerStateFactory();
  }

  public sanitize(value: unknown): OrganizerState {
    const defaults = this.factory.createInitial();
    if (!this.isObject(value)) {
      return defaults;
    }

    const foldersValue = this.isObject(value.folders) ? value.folders : {};
    const rootFolderIds = this.isStringArray(value.rootFolderIds) ? value.rootFolderIds : [];
    const expandedFolderIds = this.isStringArray(value.expandedFolderIds)
      ? value.expandedFolderIds
      : [];

    const rawSettings = this.isObject(value.settings) ? value.settings : {};
    const defaultFolderIcon =
      typeof rawSettings.defaultFolderIcon === "string" && rawSettings.defaultFolderIcon.trim().length > 0
        ? rawSettings.defaultFolderIcon.trim()
        : defaults.settings.defaultFolderIcon;
    const sortMode = rawSettings.sortMode === "name" ? "name" : defaults.settings.sortMode;
    const autoRefreshSecondsRaw =
      typeof rawSettings.autoRefreshSeconds === "number" && Number.isFinite(rawSettings.autoRefreshSeconds)
        ? Math.round(rawSettings.autoRefreshSeconds)
        : defaults.settings.autoRefreshSeconds;
    const autoRefreshSeconds = Math.max(0, Math.min(600, autoRefreshSecondsRaw));

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
      const objects = rawObjects
        .filter((obj) => this.isObject(obj))
        .map((obj) => {
          const objectId = typeof obj.objectId === "string" ? obj.objectId : "";
          const refId = typeof obj.refId === "string" ? obj.refId : "";
          const type = this.parseObjectType(obj.type);
          return new FolderObjectRef(objectId, type, refId);
        })
        .filter((obj) => obj.objectId.length > 0 && obj.refId.length > 0);

      folders[id] = new FolderNode(id, name, icon, parentId, children, objects);
    }

    return new OrganizerState(
      folders,
      rootFolderIds,
      expandedFolderIds,
      new OrganizerSettings(defaultFolderIcon, sortMode, autoRefreshSeconds),
    );
  }

  private parseObjectType(value: unknown): ObjectTypeValue {
    switch (value) {
      case ObjectType.Device:
      case ObjectType.Entity:
      case ObjectType.Helper:
      case ObjectType.Automation:
      case ObjectType.Script:
      case ObjectType.Scene:
        return value;
      default:
        return ObjectType.Entity;
    }
  }

  private isObject(value: unknown): value is Record<string, any> {
    return typeof value === "object" && value !== null;
  }

  private isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((entry) => typeof entry === "string");
  }
}
