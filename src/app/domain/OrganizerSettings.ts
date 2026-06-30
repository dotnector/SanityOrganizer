/// <summary>
/// Defines organizer preferences such as icon defaults, sort mode, and refresh interval.
/// </summary>
export type SortMode = "typeThenName" | "name";
export type OpenTarget = "new-tab" | "this-tab" | "same-other-tab";


export class OrganizerSettings {
  public sortMode: SortMode;
  public autoRefreshSeconds: number;
  public openTarget: OpenTarget;

  public constructor(sortMode: SortMode, autoRefreshSeconds: number, openTarget: OpenTarget) {
    this.sortMode = sortMode;
    this.autoRefreshSeconds = autoRefreshSeconds;
    this.openTarget = openTarget;
  }

  public static createDefault(): OrganizerSettings {
    return new OrganizerSettings("typeThenName", 60, "new-tab");
  }
}
