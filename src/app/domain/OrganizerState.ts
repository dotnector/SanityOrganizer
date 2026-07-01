import { FolderNode } from "./FolderNode";
import { OrganizerSettings } from "./OrganizerSettings";

/**
 * Represents persisted organizer data including folders, expansion state, and settings.
 */
export class OrganizerState {
  public readonly version: 1;
  public folders: Record<string, FolderNode>;
  public rootFolderIds: string[];
  public expandedFolderIds: string[];
  public settings: OrganizerSettings;

  public constructor(
    folders: Record<string, FolderNode>,
    rootFolderIds: string[],
    expandedFolderIds: string[],
    settings: OrganizerSettings,
  ) {
    this.version = 1;
    this.folders = folders;
    this.rootFolderIds = rootFolderIds;
    this.expandedFolderIds = expandedFolderIds;
    this.settings = settings;
  }
}
