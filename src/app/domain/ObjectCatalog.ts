import { ObjectRecord } from "./ObjectRecord";

export class ObjectCatalog {
  public readonly byId: Map<string, ObjectRecord>;
  public readonly all: ObjectRecord[];

  public constructor(byId: Map<string, ObjectRecord>, all: ObjectRecord[]) {
    this.byId = byId;
    this.all = all;
  }
}
