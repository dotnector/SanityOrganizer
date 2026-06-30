import { FolderNode } from "../domain/FolderNode";
import { FolderObjectRef } from "../domain/FolderObjectRef";
import { ObjectRecord } from "../domain/ObjectRecord";
import { OrganizerState } from "../domain/OrganizerState";

export class OrganizerTreeService {
  private compareFolderNames(state: OrganizerState, leftId: string, rightId: string): number {
    const left = state.folders[leftId];
    const right = state.folders[rightId];
    const leftName = left?.name ?? "";
    const rightName = right?.name ?? "";
    return leftName.localeCompare(rightName, undefined, { sensitivity: "base" });
  }

  private sortRootFolders(state: OrganizerState): void {
    state.rootFolderIds.sort((a, b) => this.compareFolderNames(state, a, b));
  }

  private sortChildren(state: OrganizerState, parentId: string): void {
    const parent = state.folders[parentId];
    if (!parent) {
      return;
    }
    parent.children.sort((a, b) => this.compareFolderNames(state, a, b));
  }

  public toggleExpanded(state: OrganizerState, folderId: string): void {
    if (state.expandedFolderIds.includes(folderId)) {
      state.expandedFolderIds = state.expandedFolderIds.filter((id) => id !== folderId);
    } else {
      state.expandedFolderIds.push(folderId);
    }
  }

  public createFolder(state: OrganizerState, parentId: string | null, folderId: string, name: string, icon: string): void {
    state.folders[folderId] = new FolderNode(folderId, name, icon, parentId, [], []);
    if (parentId) {
      state.folders[parentId]?.children.push(folderId);
      this.sortChildren(state, parentId);
      if (!state.expandedFolderIds.includes(parentId)) {
        state.expandedFolderIds.push(parentId);
      }
    } else {
      state.rootFolderIds.push(folderId);
      this.sortRootFolders(state);
    }
    if (!state.expandedFolderIds.includes(folderId)) {
      state.expandedFolderIds.push(folderId);
    }
  }

  public renameFolder(state: OrganizerState, folderId: string, name: string, icon: string): void {
    const folder = state.folders[folderId];
    if (!folder) {
      return;
    }
    folder.name = name;
    folder.icon = icon;

    if (folder.parentId) {
      this.sortChildren(state, folder.parentId);
    } else {
      this.sortRootFolders(state);
    }
  }

  public deleteFolder(state: OrganizerState, folderId: string): Set<string> {
    const removeIds = new Set<string>();
    this.collectDescendants(state, folderId, removeIds, new Set<string>());
    state.rootFolderIds = state.rootFolderIds.filter((id) => !removeIds.has(id));
    state.expandedFolderIds = state.expandedFolderIds.filter((id) => !removeIds.has(id));

    for (const folder of Object.values(state.folders)) {
      folder.children = folder.children.filter((id) => !removeIds.has(id));
    }
    for (const id of removeIds) {
      delete state.folders[id];
    }

    return removeIds;
  }

  public moveFolder(state: OrganizerState, folderId: string, newParentId: string | null): void {
    if (folderId === newParentId) {
      return;
    }
    const moving = state.folders[folderId];
    if (!moving) {
      return;
    }

    if (newParentId && this.isDescendant(state, folderId, newParentId)) {
      return;
    }

    if (moving.parentId) {
      const oldParent = state.folders[moving.parentId];
      if (oldParent) {
        oldParent.children = oldParent.children.filter((id) => id !== folderId);
      }
    } else {
      state.rootFolderIds = state.rootFolderIds.filter((id) => id !== folderId);
    }

    moving.parentId = newParentId;
    if (newParentId) {
      state.folders[newParentId]?.children.push(folderId);
      this.sortChildren(state, newParentId);
    } else {
      state.rootFolderIds.push(folderId);
      this.sortRootFolders(state);
    }
  }

  public addObjectToFolder(state: OrganizerState, folderId: string, object: ObjectRecord): void {
    const folder = state.folders[folderId];
    if (!folder) {
      return;
    }
    this.removeObjectEverywhere(state, object.objectId);
    folder.objects.push(new FolderObjectRef(object.objectId, object.type, object.refId));
  }

  public addObjectsToFolder(state: OrganizerState, folderId: string, objects: ObjectRecord[]): void {
    const folder = state.folders[folderId];
    if (!folder) {
      return;
    }
    for (const object of objects) {
      this.removeObjectEverywhere(state, object.objectId);
      folder.objects.push(new FolderObjectRef(object.objectId, object.type, object.refId));
    }
  }

  public removeObjectFromFolder(state: OrganizerState, folderId: string, objectId: string): void {
    const folder = state.folders[folderId];
    if (!folder) {
      return;
    }
    folder.objects = folder.objects.filter((obj) => obj.objectId !== objectId);
  }

  public removeObjectEverywhere(state: OrganizerState, objectId: string): void {
    for (const folder of Object.values(state.folders)) {
      folder.objects = folder.objects.filter((obj) => obj.objectId !== objectId);
    }
  }

  private collectDescendants(
    state: OrganizerState,
    folderId: string,
    acc: Set<string>,
    visited: Set<string>,
  ): void {
    if (visited.has(folderId)) {
      return;
    }
    visited.add(folderId);
    acc.add(folderId);

    const folder = state.folders[folderId];
    if (!folder) {
      return;
    }
    for (const childId of folder.children) {
      this.collectDescendants(state, childId, acc, visited);
    }
  }

  private isDescendant(state: OrganizerState, ancestorId: string, candidateDescendantId: string): boolean {
    const descendants = new Set<string>();
    this.collectDescendants(state, ancestorId, descendants, new Set<string>());
    return descendants.has(candidateDescendantId);
  }
}
