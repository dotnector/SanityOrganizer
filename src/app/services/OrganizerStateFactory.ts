import { OrganizerSettings } from "../domain/OrganizerSettings";
import { OrganizerState } from "../domain/OrganizerState";

export class OrganizerStateFactory {
  public createInitial(): OrganizerState {
    return new OrganizerState({}, [], [], OrganizerSettings.createDefault());
  }
}
