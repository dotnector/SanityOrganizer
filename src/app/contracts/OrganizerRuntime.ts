/// <summary>
/// Defines the runtime contract for loading object catalog data and persisting organizer state.
/// </summary>
import { ObjectCatalog } from "../domain/ObjectCatalog";
import { OrganizerState } from "../domain/OrganizerState";

export interface OrganizerRuntime {
  loadObjectCatalog(): Promise<ObjectCatalog>;
  loadState(): Promise<OrganizerState>;
  saveState(state: OrganizerState): Promise<void>;
}
