import { FolderNode } from "../../app/domain/FolderNode";
import { FolderHaItemRef } from "../../app/domain/FolderHaItemRef";
import { HaItemCatalog } from "../../app/domain/HaItemCatalog";
import { HaItemType } from "../../app/domain/HaItemType";
import { OrganizerSettings } from "../../app/domain/OrganizerSettings";
import { OrganizerState } from "../../app/domain/OrganizerState";

/**
Seeds initial mock folders and object assignments for local development scenarios.
 */
export class MockStateSeeder {
  public createInitialState(catalog: HaItemCatalog): OrganizerState {
    const folders: Record<string, FolderNode> = {};
    const rootFolderIds = ["favorites", "room-kitchen", "archive"];
    const expandedFolderIds = ["favorites", "room-kitchen", "deep-1", "deep-2", "deep-3"];

    folders.favorites = new FolderNode("favorites", "Favorites", "mdi:star-outline", null, ["favorites-scripts"], []);
    folders["favorites-scripts"] = new FolderNode("favorites-scripts", "Favorite Scripts", "mdi:script-text-outline", "favorites", [], []);
    folders["room-kitchen"] = new FolderNode("room-kitchen", "Kitchen", "mdi:silverware-fork-knife", null, ["deep-1"], []);
    folders.archive = new FolderNode("archive", "Archive", "mdi:archive-outline", null, [], []);

    for (let depth = 1; depth <= 8; depth += 1) {
      const id = `deep-${depth}`;
      const childId = depth < 8 ? `deep-${depth + 1}` : null;
      folders[id] = new FolderNode(
        id,
        `Nested Level ${depth}`,
        "mdi:folder-outline",
        depth === 1 ? "room-kitchen" : `deep-${depth - 1}`,
        childId ? [childId] : [],
        [],
      );
    }

    const all = catalog.all;
    const devices = all.filter((item) => item.type === HaItemType.Device).slice(0, 4);
    const entities = all.filter((item) => item.type === HaItemType.Entity).slice(0, 12);
    const helpers = all.filter((item) => item.type === HaItemType.Helper).slice(0, 4);
    const automations = all.filter((item) => item.type === HaItemType.Automation).slice(0, 4);
    const scripts = all.filter((item) => item.type === HaItemType.Script).slice(0, 4);
    const scenes = all.filter((item) => item.type === HaItemType.Scene).slice(0, 4);

    folders.favorites.objects.push(...devices.map((item) => new FolderHaItemRef(item.itemKey, item.type, item.haId)));
    folders["room-kitchen"].objects.push(...entities.slice(0, 5).map((item) => new FolderHaItemRef(item.itemKey, item.type, item.haId)));
    folders["deep-3"].objects.push(...helpers.map((item) => new FolderHaItemRef(item.itemKey, item.type, item.haId)));
    folders["favorites-scripts"].objects.push(...scripts.map((item) => new FolderHaItemRef(item.itemKey, item.type, item.haId)));
    folders.archive.objects.push(...automations.map((item) => new FolderHaItemRef(item.itemKey, item.type, item.haId)));
    folders.archive.objects.push(...scenes.map((item) => new FolderHaItemRef(item.itemKey, item.type, item.haId)));

    folders["deep-8"].objects.push(new FolderHaItemRef("entity:sensor.missing_energy_total", HaItemType.Entity, "sensor.missing_energy_total"));
    folders["deep-8"].objects.push(new FolderHaItemRef("device:dev-missing-9000", HaItemType.Device, "dev-missing-9000"));

    return new OrganizerState(
      folders,
      rootFolderIds,
      expandedFolderIds,
      "favorites",
      new OrganizerSettings("typeThenName", 60, "new-tab"),
    );
  }
}
