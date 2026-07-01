import type { HaItemTypeValue } from "./HaItemType";

/**
 * Represents a lightweight reference to a Home Assistant item stored in a folder.
 * @param itemKey - Type-prefixed catalog key, e.g. "entity:sensor.power" or "device:dev-abc123".
 * @param type - The Home Assistant item type (entity, device, helper, etc.).
 * @param haId - Raw Home Assistant identifier without the type prefix, e.g. "sensor.power".
 */
export class FolderHaItemRef {
  public readonly itemKey: string;
  public readonly type: HaItemTypeValue;
  public readonly haId: string;

  public constructor(itemKey: string, type: HaItemTypeValue, haId: string) {
    this.itemKey = itemKey;
    this.type = type;
    this.haId = haId;
  }
}
