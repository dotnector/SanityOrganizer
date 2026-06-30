/// <summary>
/// Represents a folder node with hierarchy links and contained object references.
/// </summary>
import { FolderObjectRef } from "./FolderObjectRef";

export class FolderNode {
  public readonly id: string;
  public name: string;
  public icon: string;
  public parentId: string | null;
  public children: string[];
  public objects: FolderObjectRef[];

  public constructor(
    id: string,
    name: string,
    icon: string,
    parentId: string | null,
    children: string[] = [],
    objects: FolderObjectRef[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.parentId = parentId;
    this.children = children;
    this.objects = objects;
  }
}
