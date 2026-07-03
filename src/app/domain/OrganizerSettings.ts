export type SortMode = "typeThenName" | "name";
export type OpenTarget = "new-tab" | "this-tab" | "overlay";
export type NotesDialogViewMode = "both" | "markdown" | "preview";

/**
 * Defines organizer preferences such as icon defaults, sort mode, and refresh interval.
 */
export class OrganizerSettings {
  public sortMode: SortMode;
  public autoRefreshSeconds: number;
  public openTarget: OpenTarget;
  public notesDialogWidth: number;
  public notesDialogHeight: number;
  public notesDialogViewMode: NotesDialogViewMode;

  public constructor(
    sortMode: SortMode,
    autoRefreshSeconds: number,
    openTarget: OpenTarget,
    notesDialogWidth: number,
    notesDialogHeight: number,
    notesDialogViewMode: NotesDialogViewMode,
  ) {
    this.sortMode = sortMode;
    this.autoRefreshSeconds = autoRefreshSeconds;
    this.openTarget = openTarget;
    this.notesDialogWidth = notesDialogWidth;
    this.notesDialogHeight = notesDialogHeight;
    this.notesDialogViewMode = notesDialogViewMode;
  }

  public static createDefault(): OrganizerSettings {
    return new OrganizerSettings("typeThenName", 60, "new-tab", 720, 460, "both");
  }
}
