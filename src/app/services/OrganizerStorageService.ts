/// <summary>
/// Loads and saves organizer state through Home Assistant frontend user-data APIs.
/// </summary>
import { OrganizerState } from "../domain/OrganizerState";
import { OrganizerStateSanitizer } from "./OrganizerStateSanitizer";
import type { HaConnection } from "../../ha/domain/HaConnection";

export class OrganizerStorageService {
  private static readonly STORAGE_KEY = "sanity_organizer";
  private static readonly LOG_PREFIX = "[SanityOrganizer][OrganizerStorageService]";

  private readonly connection: HaConnection;
  private readonly sanitizer: OrganizerStateSanitizer;

  public constructor(connection: HaConnection) {
    this.connection = connection;
    this.sanitizer = new OrganizerStateSanitizer();
  }

  public async load(): Promise<OrganizerState> {
    console.debug(`${OrganizerStorageService.LOG_PREFIX} load:start`, {
      storageKey: OrganizerStorageService.STORAGE_KEY,
    });
    try {
      const envelope = await this.connection.callWS<{ value: unknown }>({
        type: "frontend/get_user_data",
        key: OrganizerStorageService.STORAGE_KEY,
      });
      const sanitized = this.sanitizer.sanitize(envelope?.value ?? null);
      console.debug(`${OrganizerStorageService.LOG_PREFIX} load:success`, {
        hasEnvelope: Boolean(envelope),
        hasValue: envelope?.value != null,
        folderCount: Object.keys(sanitized.folders).length,
        rootFolderCount: sanitized.rootFolderIds.length,
      });
      return sanitized;
    } catch (error) {
      console.error(`${OrganizerStorageService.LOG_PREFIX} load:error`, error);
      throw error;
    }
  }

  public async save(state: OrganizerState): Promise<void> {
    console.debug(`${OrganizerStorageService.LOG_PREFIX} save:start`, {
      storageKey: OrganizerStorageService.STORAGE_KEY,
      folderCount: Object.keys(state.folders).length,
      rootFolderCount: state.rootFolderIds.length,
    });
    try {
      await this.connection.callWS({
        type: "frontend/set_user_data",
        key: OrganizerStorageService.STORAGE_KEY,
        value: state,
      });
      console.debug(`${OrganizerStorageService.LOG_PREFIX} save:success`, {
        storageKey: OrganizerStorageService.STORAGE_KEY,
      });
    } catch (error) {
      console.error(`${OrganizerStorageService.LOG_PREFIX} save:error`, error);
      throw error;
    }
  }
}
