/**
 * Represents the types of supported Home Assistant items.
 * This is used to categorize and identify different types of objects in the catalog.
 */
export class HaItemType {
  public static readonly Device = "device";
  public static readonly Entity = "entity";
  public static readonly Helper = "helper";
  public static readonly Automation = "automation";
  public static readonly Script = "script";
  public static readonly Scene = "scene";
}

export type HaItemTypeValue =
  | typeof HaItemType.Device
  | typeof HaItemType.Entity
  | typeof HaItemType.Helper
  | typeof HaItemType.Automation
  | typeof HaItemType.Script
  | typeof HaItemType.Scene;
