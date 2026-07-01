/// <summary>
/// Defines the runtime contract for loading object catalog data and persisting organizer state.
/// </summary>
import { HaItemCatalog } from "../domain/HaItemCatalog";
import { OrganizerState } from "../domain/OrganizerState";

export interface OrganizerRuntime {
  loadObjectCatalog(): Promise<HaItemCatalog>;
  loadState(): Promise<OrganizerState>;
  saveState(state: OrganizerState): Promise<void>;
}
