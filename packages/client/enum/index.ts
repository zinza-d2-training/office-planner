import { UniqueIdentifier } from "@dnd-kit/core";
import { MutableRefObject } from "react";

export interface ObjectShape {
  id: string;
  position: Array<number>;
  type: 'rect';
  group: string;
  index: number;
}

export interface Group {
  id: string
  parent: string
  index: number | null
  locked: boolean
}

export interface TreeItem {
  id: UniqueIdentifier;
  _id: string;
  children: TreeItem[];
  collapsed?: boolean;
  type?: string;
  position?: number[];
  index: number
  locked: boolean
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
