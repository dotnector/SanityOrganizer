/// <summary>
/// Provides filtering, sorting, and folder object resolution for catalog queries.
/// </summary>
import { FolderNode } from "../domain/FolderNode";
import { ObjectCatalog } from "../domain/ObjectCatalog";
import { ObjectRecord } from "../domain/ObjectRecord";
import { OrganizerSettings } from "../domain/OrganizerSettings";

export class ObjectQueryService {
  public filterCatalog(catalog: ObjectCatalog, search: string, settings: OrganizerSettings): ObjectRecord[] {
    const query = search.trim().toLowerCase();
    const items = query.length === 0
      ? catalog.all
      : catalog.all.filter((object) => this.toHaystack(object).includes(query));

    return this.sort(items, settings);
  }

  public folderObjects(
    folder: FolderNode,
    catalog: ObjectCatalog,
    search: string,
    settings: OrganizerSettings,
  ): ObjectRecord[] {
    const query = search.trim().toLowerCase();
    const merged = folder.objects
      .map((ref) => catalog.byId.get(ref.objectId) ?? ObjectRecord.createMissing(ref.refId, ref.objectId, ref.type))
      .filter((record) => {
        if (query.length === 0) {
          return true;
        }
        return this.toHaystack(record).includes(query);
      });

    return this.sort(merged, settings);
  }

  private toHaystack(record: ObjectRecord): string {
    return `${record.displayName} ${record.refId} ${record.type} ${record.domain ?? ""}`.toLowerCase();
  }

  private sort(items: ObjectRecord[], settings: OrganizerSettings): ObjectRecord[] {
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
