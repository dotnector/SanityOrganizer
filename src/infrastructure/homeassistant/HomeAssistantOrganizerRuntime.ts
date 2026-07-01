/// <summary>
/// Implements organizer runtime operations backed by Home Assistant services.
/// </summary>
import type { OrganizerRuntime } from "../../app/contracts/OrganizerRuntime";
import { HaItemCatalog } from "../../app/domain/HaItemCatalog";
import { OrganizerState } from "../../app/domain/OrganizerState";
import { OrganizerStorageService } from "../../app/services/OrganizerStorageService";
import { HaCatalogService } from "../../ha/services/HaCatalogService";
import { HaRuntimeConnection } from "../../ha/services/HaRuntimeConnection";
import type { HaConnection } from "../../ha/domain/HaConnection";

export class HomeAssistantOrganizerRuntime implements OrganizerRuntime {
  private static readonly LOG_PREFIX = "[SanityOrganizer][HomeAssistantRuntime]";
  private readonly storageService: OrganizerStorageService;
  private readonly catalogService: HaCatalogService;
  private readonly connection: HaRuntimeConnection;

  public constructor(hass: HaConnection) {
    this.connection = new HaRuntimeConnection(hass);
    this.storageService = new OrganizerStorageService(this.connection);
    this.catalogService = new HaCatalogService(this.connection);
  }

  public updateHass(hass: HaConnection): void {
    this.connection.updateHass(hass);
  }

  public async loadObjectCatalog(): Promise<HaItemCatalog> {
    console.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadObjectCatalog:start`);
    try {
      const catalog = await this.catalogService.loadObjectCatalog();
      console.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadObjectCatalog:success`, {
        itemCount: catalog.all.length,
      });
      return catalog;
    } catch (error) {
      console.error(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadObjectCatalog:error`, error);
      throw error;
    }
  }

  public async loadState(): Promise<OrganizerState> {
    console.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadState:start`);
    try {
      const state = await this.storageService.load();
      console.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadState:success`, {
        folderCount: Object.keys(state.folders).length,
        rootFolderCount: state.rootFolderIds.length,
      });
      return state;
    } catch (error) {
      console.error(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadState:error`, error);
      throw error;
    }
  }

  public async saveState(state: OrganizerState): Promise<void> {
    console.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} saveState:start`, {
      folderCount: Object.keys(state.folders).length,
      rootFolderCount: state.rootFolderIds.length,
    });
    try {
      await this.storageService.save(state);
      console.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} saveState:success`);
    } catch (error) {
      console.error(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} saveState:error`, error);
      throw error;
    }
  }
}
