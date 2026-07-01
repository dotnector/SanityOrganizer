import { FolderNode } from "../domain/FolderNode";
import { FolderHaItemRef } from "../domain/FolderHaItemRef";
import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";

/**
 * Creates an isolated draft before mutations.
 *
 * Tree services mutate in place, so cloning prevents accidental edits to live UI state
 * and gives each async save operation a stable snapshot.
 */
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
        folder.objects.map((obj) => new FolderHaItemRef(obj.objectId, obj.type, obj.refId)),
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
