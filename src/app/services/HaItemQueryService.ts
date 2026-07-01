import { FolderNode } from "../domain/FolderNode";
import { HaItemCatalog } from "../domain/HaItemCatalog";
import { HaItem } from "../domain/HaItem";
import { OrganizerSettings } from "../domain/OrganizerSettings";

/**
Provides filtering, sorting, and folder object resolution for catalog queries.
 */
export class HaItemQueryService {
  private unfilteredFolderCache:
    | {
        folder: FolderNode;
        byId: Map<string, HaItem>;
        sortMode: OrganizerSettings["sortMode"];
        items: HaItem[];
      }
    | null = null;

  /**
   * Filters the catalog based on the search query and organizer settings.
   */
  public filterCatalog(catalog: HaItemCatalog, search: string, settings: OrganizerSettings): HaItem[] {
    const query = search.trim().toLowerCase();
    const items = query.length === 0
      ? catalog.all
      : catalog.all.filter((object) => this.toHaystack(object).includes(query));

    return this.sort(items, settings);
  }

  /**
   * Retrieves HaItems within a folder, applying search and settings filters.
   */
  public folderObjects(
    folder: FolderNode,
    catalog: HaItemCatalog,
    search: string,
    settings: OrganizerSettings,
  ): HaItem[] {
    const query = search.trim().toLowerCase();
    const merged = folder.objects
      .map((ref) => catalog.byId.get(ref.itemKey) ?? HaItem.createMissing(ref.haId, ref.itemKey, ref.type))
      .filter((record) => {
        if (query.length === 0) {
          return true;
        }
        return this.toHaystack(record).includes(query);
      });

    return this.sort(merged, settings);
  }

  public folderObjectsUnfiltered(folder: FolderNode, catalog: HaItemCatalog, settings: OrganizerSettings): HaItem[] {
    const cached = this.unfilteredFolderCache;
    if (
      cached &&
      cached.folder === folder &&
      cached.byId === catalog.byId &&
      cached.sortMode === settings.sortMode
    ) {
      return cached.items;
    }

    const merged = folder.objects
      .map((ref) => catalog.byId.get(ref.itemKey) ?? HaItem.createMissing(ref.haId, ref.itemKey, ref.type));
    const sorted = this.sort(merged, settings);
    this.unfilteredFolderCache = {
      folder,
      byId: catalog.byId,
      sortMode: settings.sortMode,
      items: sorted,
    };
    return sorted;
  }

  private toHaystack(record: HaItem): string {
    return `${record.displayName} ${record.haId} ${record.type} ${record.domain ?? ""}`.toLowerCase();
  }

  private sort(items: HaItem[], settings: OrganizerSettings): HaItem[] {
    const sorted = [...items];
    if (settings.sortMode === "name") {
      sorted.sort((a, b) => a.displayName.localeCompare(b.displayName));
      return sorted;
    }
    sorted.sort((a, b) => {
      if (a.type === b.type) {
        return a.displayName.localeCompare(b.displayName);
      }
      return a.type.localeCompare(b.type);
    });
    return sorted;
  }
}
