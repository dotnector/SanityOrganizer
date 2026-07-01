import { HaItemCatalog } from "../domain/HaItemCatalog";
import { OrganizerState } from "../domain/OrganizerState";

/**
Defines the runtime contract for loading object catalog data and persisting organizer state.
 */
export interface OrganizerRuntime {
  loadHaItemCatalog(): Promise<HaItemCatalog>;
  loadState(): Promise<OrganizerState>;
  saveState(state: OrganizerState): Promise<void>;
}
