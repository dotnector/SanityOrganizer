import { HaItem } from "./HaItem";


/**
 * Represents a catalog of all Home Assistant items.
 * This provides both a lookup map by object ID and an ordered list of all items.
 */

/**
Stores object records as both a lookup map and an ordered list for browsing.
 */
export class HaItemCatalog {
  public readonly byId: Map<string, HaItem>;
  public readonly all: HaItem[];

  public constructor(byId: Map<string, HaItem>, all: HaItem[]) {
    this.byId = byId;
    this.all = all;
  }
}
