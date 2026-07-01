import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";

/**
 * Builds the initial empty organizer state with default settings.
 */
export class OrganizerStateFactory {
  public createInitial(): OrganizerState {
    return new OrganizerState({}, [], [], null, OrganizerSettings.createDefault());
  }
}
