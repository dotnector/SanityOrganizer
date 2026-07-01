import type { OrganizerRuntime } from "../../app/contracts/OrganizerRuntime";
import { HaItemCatalog } from "../../app/domain/HaItemCatalog";
import { OrganizerState } from "../../app/domain/OrganizerState";
import { BrowserStorageStateStore } from "./BrowserStorageStateStore";
import { MockCatalogFactory } from "./MockCatalogFactory";
import type { MockDatasetSize } from "./MockDatasetSize";
import { MockStateSeeder } from "./MockStateSeeder";

/**
Implements organizer runtime behavior using mock catalog and local browser storage.
 */
export class MockOrganizerRuntime implements OrganizerRuntime {
  private static readonly LOG_PREFIX = "[SanityOrganizer][MockRuntime]";
  private readonly catalog: HaItemCatalog;
  private readonly stateStore: BrowserStorageStateStore;
  private readonly stateSeeder: MockStateSeeder;

  public constructor(size: MockDatasetSize) {
    this.catalog = new MockCatalogFactory().create(size);
    this.stateStore = new BrowserStorageStateStore(`sanity_organizer_mock_${size}`);
    this.stateSeeder = new MockStateSeeder();
  }

  public async loadHaItemCatalog(): Promise<HaItemCatalog> {
    console.debug(`${MockOrganizerRuntime.LOG_PREFIX} loadHaItemCatalog:start`);
    console.debug(`${MockOrganizerRuntime.LOG_PREFIX} loadHaItemCatalog:success`, {
      itemCount: this.catalog.all.length,
    });
    return this.catalog;
  }

  public async loadState(): Promise<OrganizerState> {
    console.debug(`${MockOrganizerRuntime.LOG_PREFIX} loadState:start`);
    try {
      const state = this.stateStore.load(() => this.stateSeeder.createInitialState(this.catalog));
      console.debug(`${MockOrganizerRuntime.LOG_PREFIX} loadState:success`, {
        folderCount: Object.keys(state.folders).length,
        rootFolderCount: state.rootFolderIds.length,
      });
      return state;
    } catch (error) {
      console.error(`${MockOrganizerRuntime.LOG_PREFIX} loadState:error`, error);
      throw error;
    }
  }

  public async saveState(state: OrganizerState): Promise<void> {
    console.debug(`${MockOrganizerRuntime.LOG_PREFIX} saveState:start`, {
      folderCount: Object.keys(state.folders).length,
      rootFolderCount: state.rootFolderIds.length,
    });
    try {
      this.stateStore.save(state);
      console.debug(`${MockOrganizerRuntime.LOG_PREFIX} saveState:success`);
    } catch (error) {
      console.error(`${MockOrganizerRuntime.LOG_PREFIX} saveState:error`, error);
      throw error;
    }
  }
}
