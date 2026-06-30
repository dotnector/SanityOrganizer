/// <summary>
/// Creates deep copies of organizer state for safe mutation workflows.
/// </summary>
import { FolderNode } from "../domain/FolderNode";
import { FolderObjectRef } from "../domain/FolderObjectRef";
import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";

export class OrganizerStateCloner {
  public clone(state: OrganizerState): OrganizerState {
    const folders: Record<string, FolderNode> = {};
    for (const [id, folder] of Object.entries(state.folders)) {
      folders[id] = new FolderNode(
        folder.id,
        folder.name,
        folder.icon,
        folder.parentId,
        [...folder.children],
        folder.objects.map((obj) => new FolderObjectRef(obj.objectId, obj.type, obj.refId)),
      );
    }

    return new OrganizerState(
      folders,
      [...state.rootFolderIds],
      [...state.expandedFolderIds],
      new OrganizerSettings(
        state.settings.sortMode,
        state.settings.autoRefreshSeconds,
        state.settings.openTarget,
      ),
    );
  }
}
