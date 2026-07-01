import { OrganizerState } from "../../app/domain/OrganizerState";
import { OrganizerStateSanitizer } from "../../app/services/OrganizerStateSanitizer";

/**
Persists and restores mock organizer state in browser localStorage with sanitization.
 */
export class BrowserStorageStateStore {
  private static readonly LOG_PREFIX = "[SanityOrganizer][BrowserStorageStateStore]";
  private readonly storageKey: string;
  private readonly sanitizer: OrganizerStateSanitizer;

  public constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.sanitizer = new OrganizerStateSanitizer();
  }

  public load(orCreate: () => OrganizerState): OrganizerState {
    console.debug(`${BrowserStorageStateStore.LOG_PREFIX} load:start`, {
      storageKey: this.storageKey,
    });
    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) {
      console.warn(`${BrowserStorageStateStore.LOG_PREFIX} load:missing`, {
        storageKey: this.storageKey,
        reason: "No state found. Seeding initial state.",
      });
      const seeded = orCreate();
      this.save(seeded);
      console.debug(`${BrowserStorageStateStore.LOG_PREFIX} load:seeded`, {
        folderCount: Object.keys(seeded.folders).length,
        rootFolderCount: seeded.rootFolderIds.length,
      });
      return seeded;
    }

    try {
      const sanitized = this.sanitizer.sanitize(JSON.parse(raw));
      console.debug(`${BrowserStorageStateStore.LOG_PREFIX} load:success`, {
        storageKey: this.storageKey,
        rawLength: raw.length,
        folderCount: Object.keys(sanitized.folders).length,
        rootFolderCount: sanitized.rootFolderIds.length,
      });
      return sanitized;
    } catch (error) {
      console.error(`${BrowserStorageStateStore.LOG_PREFIX} load:parse-error`, {
        storageKey: this.storageKey,
        rawPreview: raw.slice(0, 200),
      }, error);
      const seeded = orCreate();
      this.save(seeded);
      console.debug(`${BrowserStorageStateStore.LOG_PREFIX} load:reseeded-after-error`, {
        folderCount: Object.keys(seeded.folders).length,
        rootFolderCount: seeded.rootFolderIds.length,
      });
      return seeded;
    }
  }

  public save(state: OrganizerState): void {
    console.debug(`${BrowserStorageStateStore.LOG_PREFIX} save:start`, {
      storageKey: this.storageKey,
      folderCount: Object.keys(state.folders).length,
      rootFolderCount: state.rootFolderIds.length,
    });
    try {
      const serialized = JSON.stringify(state);
      window.localStorage.setItem(this.storageKey, serialized);
      console.debug(`${BrowserStorageStateStore.LOG_PREFIX} save:success`, {
        storageKey: this.storageKey,
        serializedLength: serialized.length,
      });
    } catch (error) {
      console.error(`${BrowserStorageStateStore.LOG_PREFIX} save:error`, {
        storageKey: this.storageKey,
      }, error);
      throw error;
    }
  }
}
