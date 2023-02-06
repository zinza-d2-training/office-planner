import { UniqueIdentifier } from '@dnd-kit/core';
import { FlattenedItem, Group, TreeItem, TreeItems } from '../enum';
import { ObjectShape } from '../enum/index';
import { useCallback } from 'react';

export const getTree = (
  currentGroup: Group,
  listGroup: Group[],
  listObjects: ObjectShape[],
  locked = undefined
) => {
  let children: TreeItems = [];
  for (const group of listGroup) {
    if (group.parent === currentGroup.id) {
      children.push(getTree(group, listGroup, listObjects, currentGroup.locked ||  locked))
    }
  };

  for (const object of listObjects) {
    if (object.group === currentGroup.id) {
      children.push({
        id: `object-${object.id}`,
        _id: object.id,
        type: object.type,
        position: object.position,
        children: [],
        index: object.index,
        locked: currentGroup.locked || locked
      })
    }
  };

  children = children.sort((a,b) => a.index - b.index);
  return {
    id: `group-${currentGroup.id}`,
    type: "group",
    _id: currentGroup.id,
    children,
    index: currentGroup.index,
    locked: locked ?? currentGroup.locked
  } as TreeItem
}

export function flatten(
  items: TreeItems,
  parentId: UniqueIdentifier = null,
  depth = 0
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item) => {
    return [
      ...acc,
      { ...item, parentId, depth },
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
}

export function flattenTree(items: TreeItems): FlattenedItem[] {
  return flatten(items);
}

