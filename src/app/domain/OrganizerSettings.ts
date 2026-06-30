/// <summary>
/// Defines organizer preferences such as icon defaults, sort mode, and refresh interval.
/// </summary>
export type SortMode = "typeThenName" | "name";

export class OrganizerSettings {
  public defaultFolderIcon: string;
  public sortMode: SortMode;
  public autoRefreshSeconds: number;

  public constructor(defaultFolderIcon: string, sortMode: SortMode, autoRefreshSeconds: number) {
    this.defaultFolderIcon = defaultFolderIcon;
    this.sortMode = sortMode;
    this.autoRefreshSeconds = autoRefreshSeconds;
  }

  public static createDefault(): OrganizerSettings {
    return new OrganizerSettings("mdi:folder-outline", "typeThenName", 60);
  }
}
