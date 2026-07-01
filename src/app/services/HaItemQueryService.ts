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
    const fragments = this.normalizeSearch(search);
    const items = fragments.length === 0
      ? catalog.all
      : catalog.all.filter((object) =>
          this.matchesOrderedFragmentsInField(object.displayName, fragments) ||
          this.matchesOrderedFragmentsInField(object.haId, fragments),
        );

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
    const fragments = this.normalizeSearch(search);
    const merged = folder.objects
      .map((ref) => catalog.byId.get(ref.itemKey) ?? HaItem.createMissing(ref.haId, ref.itemKey, ref.type))
      .filter((record) => {
        if (fragments.length === 0) {
          return true;
        }
        return (
          this.matchesOrderedFragmentsInField(record.displayName, fragments) ||
          this.matchesOrderedFragmentsInField(record.haId, fragments)
        );
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

  private normalizeSearch(search: string): string[] {
    return search
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((fragment) => fragment.length > 0);
  }

  private matchesOrderedFragments(haystack: string, fragments: string[]): boolean {
    let searchIndex = 0;
    for (const fragment of fragments) {
      const foundIndex = haystack.indexOf(fragment, searchIndex);
      if (foundIndex < 0) {
        return false;
      }
      searchIndex = foundIndex + fragment.length;
    }
    return true;
  }

  private matchesOrderedFragmentsInField(value: string, fragments: string[]): boolean {
    return this.matchesOrderedFragments(value.toLowerCase(), fragments);
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
