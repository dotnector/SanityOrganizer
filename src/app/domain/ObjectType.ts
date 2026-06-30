export class ObjectType {
  public static readonly Device = "device";
  public static readonly Entity = "entity";
  public static readonly Helper = "helper";
  public static readonly Automation = "automation";
  public static readonly Script = "script";
  public static readonly Scene = "scene";
}

export type ObjectTypeValue =
  | typeof ObjectType.Device
  | typeof ObjectType.Entity
  | typeof ObjectType.Helper
  | typeof ObjectType.Automation
  | typeof ObjectType.Script
  | typeof ObjectType.Scene;
