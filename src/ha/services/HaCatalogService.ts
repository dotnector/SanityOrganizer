/// <summary>
/// Builds the object catalog from Home Assistant registries and current runtime states.
/// </summary>
import { HaItemCatalog } from "../../app/domain/HaItemCatalog";
import { HaItem } from "../../app/domain/HaItem";
import { HaItemType, type HaItemTypeValue } from "../../app/domain/HaItemType";
import type {
  HaConnection,
  HaDeviceRegistryEntry,
  HaEntityRegistryEntry,
} from "../domain/HaConnection";

export class HaCatalogService {
  private static readonly HELPER_DOMAINS = new Set([
    "input_boolean",
    "input_button",
    "input_datetime",
    "input_number",
    "input_select",
    "input_text",
    "counter",
    "timer",
    "schedule",
    "todo",
  ]);

  private static readonly EXCLUDED_ENTITY_DOMAINS = new Set(["automation", "script", "scene"]);

  private static readonly ICONS: Record<HaItemTypeValue, string> = {
    [HaItemType.Device]: "mdi:devices",
    [HaItemType.Entity]: "mdi:shape-outline",
    [HaItemType.Helper]: "mdi:tune-variant",
    [HaItemType.Automation]: "mdi:robot",
    [HaItemType.Script]: "mdi:script-text-outline",
    [HaItemType.Scene]: "mdi:palette-outline",
  };

  private readonly connection: HaConnection;

  public constructor(connection: HaConnection) {
    this.connection = connection;
  }

  public async loadObjectCatalog(): Promise<HaItemCatalog> {
    const [devices, entityRegistry] = await Promise.all([
      this.connection.callWS<HaDeviceRegistryEntry[]>({ type: "config/device_registry/list" }),
      this.connection.callWS<HaEntityRegistryEntry[]>({ type: "config/entity_registry/list" }),
    ]);

    const byId = new Map<string, HaItem>();

    for (const device of devices) {
      const displayName = device.name_by_user || device.name || `Device ${device.id}`;
      byId.set(
        `device:${device.id}`,
        new HaItem(
          `device:${device.id}`,
          HaItemType.Device,
          device.id,
          displayName,
          HaCatalogService.ICONS[HaItemType.Device],
          undefined,
          [device.manufacturer, device.model].filter(Boolean).join(" - ") || undefined,
        ),
      );
    }

    for (const entry of entityRegistry) {
      const domain = this.entityDomain(entry.entity_id);
      const stateObj = this.connection.states[entry.entity_id];
      const displayName =
        (stateObj && this.displayEntityName(entry.entity_id, stateObj.attributes)) ||
        entry.name ||
        entry.original_name ||
        entry.entity_id;

      if (HaCatalogService.HELPER_DOMAINS.has(domain)) {
        byId.set(
          `helper:${entry.entity_id}`,
          new HaItem(
            `helper:${entry.entity_id}`,
            HaItemType.Helper,
            entry.entity_id,
            displayName,
            HaCatalogService.ICONS[HaItemType.Helper],
            domain,
          ),
        );
        continue;
      }

      if (!HaCatalogService.EXCLUDED_ENTITY_DOMAINS.has(domain)) {
        byId.set(
          `entity:${entry.entity_id}`,
          new HaItem(
            `entity:${entry.entity_id}`,
            HaItemType.Entity,
            entry.entity_id,
            displayName,
            HaCatalogService.ICONS[HaItemType.Entity],
            domain,
          ),
        );
      }
    }

    for (const [entityId, stateObj] of Object.entries(this.connection.states)) {
      const domain = this.entityDomain(entityId);
      const displayName = this.displayEntityName(entityId, stateObj.attributes);
      if (domain === "automation") {
        byId.set(
          `automation:${entityId}`,
          new HaItem(
            `automation:${entityId}`,
            HaItemType.Automation,
            entityId,
            displayName,
            HaCatalogService.ICONS[HaItemType.Automation],
            domain,
          ),
        );
      } else if (domain === "script") {
        byId.set(
          `script:${entityId}`,
          new HaItem(
            `script:${entityId}`,
            HaItemType.Script,
            entityId,
            displayName,
            HaCatalogService.ICONS[HaItemType.Script],
            domain,
          ),
        );
      } else if (domain === "scene") {
        byId.set(
          `scene:${entityId}`,
          new HaItem(
            `scene:${entityId}`,
            HaItemType.Scene,
            entityId,
            displayName,
            HaCatalogService.ICONS[HaItemType.Scene],
            domain,
          ),
        );
      }
    }

    const all = [...byId.values()].sort((a, b) => {
      if (a.type === b.type) {
        return a.displayName.localeCompare(b.displayName);
      }
      return a.type.localeCompare(b.type);
    });

    return new HaItemCatalog(byId, all);
  }

  private displayEntityName(entityId: string, attrs: Record<string, unknown>): string {
    const friendlyName = attrs.friendly_name;
    if (typeof friendlyName === "string" && friendlyName.trim().length > 0) {
      return friendlyName;
    }
    return entityId;
  }

  private entityDomain(entityId: string): string {
    const idx = entityId.indexOf(".");
    return idx > 0 ? entityId.slice(0, idx) : "";
  }
}
