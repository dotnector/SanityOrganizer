/// <summary>
/// Represents a lightweight reference to an object stored inside a folder.
/// </summary>
import type { ObjectTypeValue } from "./ObjectType";

/**
 * Represents a lightweight reference to a Home Assistant object stored inside a folder.
 * @param objectId - Type-prefixed catalog key used to look up the live object, e.g. "entity:sensor.power" or "device:dev-abc123". Used as the primary key for catalog lookups.
 * @param type - The Home Assistant object type (entity, device, etc.).
 * @param refId - The raw HA identifier without the type prefix, e.g. "sensor.power". Only used as a display fallback when the object no longer exists in the catalog.
 */
export class FolderObjectRef {
  public readonly objectId: string;
  public readonly type: ObjectTypeValue;
  public readonly refId: string;

  public constructor(objectId: string, type: ObjectTypeValue, refId: string) {
    this.objectId = objectId;
    this.type = type;
    this.refId = refId;
  }
}
