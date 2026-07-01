import type { OrganizerRuntime } from "../../app/contracts/OrganizerRuntime";
import { HaItemCatalog } from "../../app/domain/HaItemCatalog";
import { OrganizerState } from "../../app/domain/OrganizerState";
import { OrganizerStorageService } from "../../app/services/OrganizerStorageService";
import { HaCatalogService } from "../../ha/services/HaCatalogService";
import { HaRuntimeConnection } from "../../ha/services/HaRuntimeConnection";
import type { HaConnection } from "../../ha/domain/HaConnection";
import { Logger } from "../Logger";

/**
Implements organizer runtime operations backed by Home Assistant services.
 */
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

  public async loadHaItemCatalog(): Promise<HaItemCatalog> {
    Logger.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadHaItemCatalog:start`);
    try {
      const catalog = await this.catalogService.loadHaItemCatalog();
      Logger.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadHaItemCatalog:success`, {
        itemCount: catalog.all.length,
      });
      return catalog;
    } catch (error) {
      Logger.error(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadHaItemCatalog:error`, error);
      throw error;
    }
  }

  public async loadState(): Promise<OrganizerState> {
    Logger.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadState:start`);
    try {
      const state = await this.storageService.load();
      Logger.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadState:success`, {
        folderCount: Object.keys(state.folders).length,
        rootFolderCount: state.rootFolderIds.length,
      });
      return state;
    } catch (error) {
      Logger.error(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} loadState:error`, error);
      throw error;
    }
  }

  public async saveState(state: OrganizerState): Promise<void> {
    Logger.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} saveState:start`, {
      folderCount: Object.keys(state.folders).length,
      rootFolderCount: state.rootFolderIds.length,
    });
    try {
      await this.storageService.save(state);
      Logger.debug(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} saveState:success`);
    } catch (error) {
      Logger.error(`${HomeAssistantOrganizerRuntime.LOG_PREFIX} saveState:error`, error);
      throw error;
    }
  }
}
