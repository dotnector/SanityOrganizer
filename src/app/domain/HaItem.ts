import type { HaItemTypeValue } from "./HaItemType";

/**
Represents a catalog object with identity, display metadata, and optional details.
 */
export class HaItem {
  public readonly itemKey: string;
  public readonly type: HaItemTypeValue;
  public readonly haId: string;
  public readonly displayName: string;
  public readonly icon: string;
  public readonly domain?: string;
  public readonly subtitle?: string;

  public constructor(
    itemKey: string,
    type: HaItemTypeValue,
    haId: string,
    displayName: string,
    icon: string,
    domain?: string,
    subtitle?: string,
  ) {
    this.itemKey = itemKey;
    this.type = type;
    this.haId = haId;
    this.displayName = displayName;
    this.icon = icon;
    this.domain = domain;
    this.subtitle = subtitle;
  }

  public static createMissing(haId: string, itemKey: string, type: HaItemTypeValue): HaItem {
    return new HaItem(
      itemKey,
      type,
      haId,
      `(Missing) ${haId}`,
      "mdi:alert-outline",
      undefined,
      "Reference no longer exists",
    );
  }
}
