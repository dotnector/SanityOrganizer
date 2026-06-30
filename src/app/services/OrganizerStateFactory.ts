/// <summary>
/// Builds the initial empty organizer state with default settings.
/// </summary>
import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";

export class OrganizerStateFactory {
  public createInitial(): OrganizerState {
    return new OrganizerState({}, [], [], OrganizerSettings.createDefault());
  }
}
