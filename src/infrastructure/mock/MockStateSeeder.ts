import { FolderNode } from "../../app/domain/FolderNode";
import { FolderObjectRef } from "../../app/domain/FolderObjectRef";
import { ObjectCatalog } from "../../app/domain/ObjectCatalog";
import { ObjectType } from "../../app/domain/ObjectType";
import { OrganizerSettings } from "../../app/domain/OrganizerSettings";
import { OrganizerState } from "../../app/domain/OrganizerState";

export class MockStateSeeder {
  public createInitialState(catalog: ObjectCatalog): OrganizerState {
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
    const devices = all.filter((item) => item.type === ObjectType.Device).slice(0, 4);
    const entities = all.filter((item) => item.type === ObjectType.Entity).slice(0, 12);
    const helpers = all.filter((item) => item.type === ObjectType.Helper).slice(0, 4);
    const automations = all.filter((item) => item.type === ObjectType.Automation).slice(0, 4);
    const scripts = all.filter((item) => item.type === ObjectType.Script).slice(0, 4);
    const scenes = all.filter((item) => item.type === ObjectType.Scene).slice(0, 4);

    folders.favorites.objects.push(...devices.map((item) => new FolderObjectRef(item.objectId, item.type, item.refId)));
    folders["room-kitchen"].objects.push(...entities.slice(0, 5).map((item) => new FolderObjectRef(item.objectId, item.type, item.refId)));
    folders["deep-3"].objects.push(...helpers.map((item) => new FolderObjectRef(item.objectId, item.type, item.refId)));
    folders["favorites-scripts"].objects.push(...scripts.map((item) => new FolderObjectRef(item.objectId, item.type, item.refId)));
    folders.archive.objects.push(...automations.map((item) => new FolderObjectRef(item.objectId, item.type, item.refId)));
    folders.archive.objects.push(...scenes.map((item) => new FolderObjectRef(item.objectId, item.type, item.refId)));

    folders["deep-8"].objects.push(new FolderObjectRef("entity:sensor.missing_energy_total", ObjectType.Entity, "sensor.missing_energy_total"));
    folders["deep-8"].objects.push(new FolderObjectRef("device:dev-missing-9000", ObjectType.Device, "dev-missing-9000"));

    return new OrganizerState(
      folders,
      rootFolderIds,
      expandedFolderIds,
      new OrganizerSettings("mdi:folder-outline", "typeThenName", 60),
    );
  }
}
