import { FolderHaItemRef } from "./FolderHaItemRef";


/**
 * Represents a folder node in a hierarchical structure, containing references to child folders and associated objects.
 * @param id - The unique identifier for the folder node.
 * @param name - The display name of the folder node.
 * @param icon - The icon associated with the folder node.
 * @param parentId - Reference to parent folder, if any. Root folders will have a null parentId.
 * @param children - An array of unique identifiers for child folder nodes.
 * @param objects - An array of references to Home Assistant entities contained within the folder node.
 */

/**
Represents a folder node with hierarchy links and contained object references.
 */
export class FolderNode {
  public readonly id: string;
  public name: string;
  public icon: string;
  public parentId: string | null;
  public children: string[];
  public objects: FolderHaItemRef[];

  public constructor(
    id: string,
    name: string,
    icon: string,
    parentId: string | null,
    children: string[] = [],
    objects: FolderHaItemRef[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.parentId = parentId;
    this.children = children;
    this.objects = objects;
  }
}
