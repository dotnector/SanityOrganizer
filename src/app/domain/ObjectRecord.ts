/// <summary>
/// Represents a catalog object with identity, display metadata, and optional details.
/// </summary>
import type { ObjectTypeValue } from "./ObjectType";

export class ObjectRecord {
  public readonly objectId: string;
  public readonly type: ObjectTypeValue;
  public readonly refId: string;
  public readonly displayName: string;
  public readonly icon: string;
  public readonly domain?: string;
  public readonly secondary?: string;

  public constructor(
    objectId: string,
    type: ObjectTypeValue,
    refId: string,
    displayName: string,
    icon: string,
    domain?: string,
    secondary?: string,
  ) {
    this.objectId = objectId;
    this.type = type;
    this.refId = refId;
    this.displayName = displayName;
    this.icon = icon;
    this.domain = domain;
    this.secondary = secondary;
  }

  public static createMissing(refId: string, objectId: string, type: ObjectTypeValue): ObjectRecord {
    return new ObjectRecord(
      objectId,
      type,
      refId,
      `(Missing) ${refId}`,
      "mdi:alert-outline",
      undefined,
      "Reference no longer exists",
    );
  }
}
