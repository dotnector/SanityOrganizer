import { ObjectCatalog } from "../../app/domain/ObjectCatalog";
import { ObjectRecord } from "../../app/domain/ObjectRecord";
import { ObjectType } from "../../app/domain/ObjectType";
import type { MockDatasetSize } from "./MockDatasetSize";

export class MockCatalogFactory {
  private static readonly ICONS = {
    [ObjectType.Device]: "mdi:devices",
    [ObjectType.Entity]: "mdi:shape-outline",
    [ObjectType.Helper]: "mdi:tune-variant",
    [ObjectType.Automation]: "mdi:robot",
    [ObjectType.Script]: "mdi:script-text-outline",
    [ObjectType.Scene]: "mdi:palette-outline",
  };

  public create(size: MockDatasetSize): ObjectCatalog {
    const counts = this.getCounts(size);
    const byId = new Map<string, ObjectRecord>();

    this.addDevices(byId, counts.devices);
    this.addEntities(byId, counts.entities);
    this.addHelpers(byId, counts.helpers);
    this.addDomainObjects(byId, ObjectType.Automation, "automation", counts.automations);
    this.addDomainObjects(byId, ObjectType.Script, "script", counts.scripts);
    this.addDomainObjects(byId, ObjectType.Scene, "scene", counts.scenes);

    const all = [...byId.values()].sort((a, b) => {
      if (a.type === b.type) {
        return a.displayName.localeCompare(b.displayName);
      }
      return a.type.localeCompare(b.type);
    });

    return new ObjectCatalog(byId, all);
  }

  private addDevices(byId: Map<string, ObjectRecord>, count: number): void {
    const manufacturers = ["Philips", "Aqara", "IKEA", "Shelly", "Samsung"];
    const models = ["Hub", "Sensor", "Switch", "Plug", "Light"];
    for (let index = 1; index <= count; index += 1) {
      const id = `dev-${index.toString().padStart(4, "0")}`;
      const displayName = `Kitchen Sensor ${((index - 1) % 7) + 1}`;
      const secondary = `${manufacturers[index % manufacturers.length]} - ${models[index % models.length]}`;
      byId.set(
        `device:${id}`,
        new ObjectRecord(
          `device:${id}`,
          ObjectType.Device,
          id,
          displayName,
          MockCatalogFactory.ICONS[ObjectType.Device],
          undefined,
          secondary,
        ),
      );
    }
  }

  private addEntities(byId: Map<string, ObjectRecord>, count: number): void {
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
        new ObjectRecord(
          `entity:${entityId}`,
          ObjectType.Entity,
          entityId,
          displayName,
          MockCatalogFactory.ICONS[ObjectType.Entity],
          domain,
        ),
      );
    }
  }

  private addHelpers(byId: Map<string, ObjectRecord>, count: number): void {
    const domains = ["input_boolean", "input_select", "input_number", "input_text", "timer"];
    const names = ["Vacation Mode", "Heating Preset", "Brightness Offset", "Note", "Cleanup Timer"];
    for (let index = 1; index <= count; index += 1) {
      const domain = domains[index % domains.length];
      const entityId = `${domain}.helper_${index.toString().padStart(4, "0")}`;
      const displayName = names[index % names.length];
      byId.set(
        `helper:${entityId}`,
        new ObjectRecord(
          `helper:${entityId}`,
          ObjectType.Helper,
          entityId,
          displayName,
          MockCatalogFactory.ICONS[ObjectType.Helper],
          domain,
        ),
      );
    }
  }

  private addDomainObjects(
    byId: Map<string, ObjectRecord>,
    type: typeof ObjectType.Automation | typeof ObjectType.Script | typeof ObjectType.Scene,
    domain: string,
    count: number,
  ): void {
    const names = ["Morning Routine", "Arrival", "Night Shutdown", "Energy Saver", "Garden Watering"];
    const prefix = type === ObjectType.Automation ? "automation" : type === ObjectType.Script ? "script" : "scene";
    for (let index = 1; index <= count; index += 1) {
      const entityId = `${domain}.${prefix}_${index.toString().padStart(4, "0")}`;
      const displayName = `${names[index % names.length]} ${((index - 1) % 9) + 1}`;
      byId.set(
        `${type}:${entityId}`,
        new ObjectRecord(
          `${type}:${entityId}`,
          type,
          entityId,
          displayName,
          MockCatalogFactory.ICONS[type],
          domain,
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
