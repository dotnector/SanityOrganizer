import { ObjectCatalog } from "../domain/ObjectCatalog";
import { OrganizerState } from "../domain/OrganizerState";

export interface OrganizerRuntime {
  loadObjectCatalog(): Promise<ObjectCatalog>;
  loadState(): Promise<OrganizerState>;
  saveState(state: OrganizerState): Promise<void>;
}
