import type { ObjectTypeValue } from "./ObjectType";

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
