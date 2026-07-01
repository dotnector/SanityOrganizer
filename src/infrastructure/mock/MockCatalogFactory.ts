import { HaItemCatalog } from "../../app/domain/HaItemCatalog";
import { HaItem } from "../../app/domain/HaItem";
import { HaItemType } from "../../app/domain/HaItemType";
import type { MockDatasetSize } from "./MockDatasetSize";

/**
Generates mock object catalogs for small, medium, and large development datasets.
 */
export class MockCatalogFactory {
  private static readonly ICONS = {
    [HaItemType.Device]: "mdi:devices",
    [HaItemType.Entity]: "mdi:shape-outline",
    [HaItemType.Helper]: "mdi:tune-variant",
    [HaItemType.Automation]: "mdi:robot",
    [HaItemType.Script]: "mdi:script-text-outline",
    [HaItemType.Scene]: "mdi:palette-outline",
  };

  public create(size: MockDatasetSize): HaItemCatalog {
    const counts = this.getCounts(size);
    const byId = new Map<string, HaItem>();

    this.addDevices(byId, counts.devices);
    this.addEntities(byId, counts.entities);
    this.addHelpers(byId, counts.helpers);
    this.addDomainObjects(byId, HaItemType.Automation, "automation", counts.automations);
    this.addDomainObjects(byId, HaItemType.Script, "script", counts.scripts);
    this.addDomainObjects(byId, HaItemType.Scene, "scene", counts.scenes);

    const all = [...byId.values()].sort((a, b) => {
      if (a.type === b.type) {
        return a.displayName.localeCompare(b.displayName);
      }
      return a.type.localeCompare(b.type);
    });

    return new HaItemCatalog(byId, all);
  }

  private addDevices(byId: Map<string, HaItem>, count: number): void {
    const manufacturers = ["Philips", "Aqara", "IKEA", "Shelly", "Samsung"];
    const models = ["Hub", "Sensor", "Switch", "Plug", "Light"];
    for (let index = 1; index <= count; index += 1) {
      const id = `dev-${index.toString().padStart(4, "0")}`;
      const displayName = `Kitchen Sensor ${((index - 1) % 7) + 1}`;
      const subtitle = `${manufacturers[index % manufacturers.length]} - ${models[index % models.length]}`;
      byId.set(
        `device:${id}`,
        new HaItem(
          `device:${id}`,
          HaItemType.Device,
          id,
          displayName,
          MockCatalogFactory.ICONS[HaItemType.Device],
          undefined,
          subtitle,
          id,
        ),
      );
    }
  }

  private addEntities(byId: Map<string, HaItem>, count: number): void {
    const domains = ["light", "sensor", "binary_sensor", "switch", "climate", "cover"];
    const rooms = ["kitchen", "living_room", "hallway", "bedroom", "garage", "office"];
    const names = ["Lamp", "Temperature", "Motion", "Fan", "Door", "Outlet"];
    for (let index = 1; index <= count; index += 1) {
      const domain = domains[index % domains.length];
      const room = rooms[index % rooms.length];
      const entityId = `${domain}.${room}_${index.toString().padStart(4, "0")}`;
      const displayName = `${rooms[index % rooms.length].replace("_", " ")} ${names[index % names.length]}`;
      byId.set(
        `entity:${entityId}`,
        new HaItem(
          `entity:${entityId}`,
          HaItemType.Entity,
          entityId,
          displayName,
          MockCatalogFactory.ICONS[HaItemType.Entity],
          domain,
          undefined,
          entityId,
        ),
      );
    }
  }

  private addHelpers(byId: Map<string, HaItem>, count: number): void {
    const domains = ["input_boolean", "input_select", "input_number", "input_text", "timer"];
    const names = ["Vacation Mode", "Heating Preset", "Brightness Offset", "Note", "Cleanup Timer"];
    for (let index = 1; index <= count; index += 1) {
      const domain = domains[index % domains.length];
      const entityId = `${domain}.helper_${index.toString().padStart(4, "0")}`;
      const displayName = names[index % names.length];
      byId.set(
        `helper:${entityId}`,
        new HaItem(
          `helper:${entityId}`,
          HaItemType.Helper,
          entityId,
          displayName,
          MockCatalogFactory.ICONS[HaItemType.Helper],
          domain,
          undefined,
          entityId,
        ),
      );
    }
  }

  private addDomainObjects(
    byId: Map<string, HaItem>,
    type: typeof HaItemType.Automation | typeof HaItemType.Script | typeof HaItemType.Scene,
    domain: string,
    count: number,
  ): void {
    const names = ["Morning Routine", "Arrival", "Night Shutdown", "Energy Saver", "Garden Watering"];
    const prefix = type === HaItemType.Automation ? "automation" : type === HaItemType.Script ? "script" : "scene";
    for (let index = 1; index <= count; index += 1) {
      const entityId = `${domain}.${prefix}_${index.toString().padStart(4, "0")}`;
      const displayName = `${names[index % names.length]} ${((index - 1) % 9) + 1}`;
      const editorId =
        type === HaItemType.Automation || type === HaItemType.Scene
          ? `${1782896022000 + index}`
          : `script_${index.toString().padStart(4, "0")}`;
      byId.set(
        `${type}:${entityId}`,
        new HaItem(
          `${type}:${entityId}`,
          type,
          entityId,
          displayName,
          MockCatalogFactory.ICONS[type],
          domain,
          undefined,
          editorId,
        ),
      );
    }
  }

  private getCounts(size: MockDatasetSize): {
    devices: number;
    entities: number;
    helpers: number;
    automations: number;
    scripts: number;
    scenes: number;
  } {
    switch (size) {
      case "small":
        return { devices: 8, entities: 20, helpers: 8, automations: 6, scripts: 4, scenes: 4 };
      case "large":
        return { devices: 800, entities: 2800, helpers: 500, automations: 400, scripts: 250, scenes: 250 };
      case "medium":
      default:
        return { devices: 80, entities: 250, helpers: 70, automations: 40, scripts: 30, scenes: 30 };
    }
  }
}
