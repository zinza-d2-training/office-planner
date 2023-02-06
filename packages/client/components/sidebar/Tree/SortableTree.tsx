import { Announcements, closestCenter, defaultDropAnimation, DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, KeyboardSensor, MeasuringStrategy, Modifier, PointerSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ObjectShape, TreeItems, Group, TreeItem, FlattenedItem } from '../../../enum/index';
import { SortableTreeItem } from './TreeItem';
import { buildTree, getChildCount, getProjection, removeChildrenOf, removeItem, setProperty } from './utilities';
import { CSS } from '@dnd-kit/utilities';
import { flattenTree, getTree } from 'packages/client/helper/helper';

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};


const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}

export function SortableTree({
  collapsible,
  defaultItems = [],
  indicator = false, //chi so
  indentationWidth = 50, // lui dau dong
  removable,
  listObject,
  setListObject,
  listGroup,
  setListGroup,
}: {
  collapsible?: boolean
  defaultItems?: TreeItems,
  indicator?: boolean,
  indentationWidth?: number,
  removable?: boolean,
  listObject: ObjectShape[]
  setListObject: React.Dispatch<React.SetStateAction<ObjectShape[]>>
  listGroup: Group[]
  setListGroup: React.Dispatch<React.SetStateAction<Group[]>>
}) {

  const [items, setItems] = useState(() => [])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);

  useEffect(() => {
    setItems(getTree(listGroup[0], listGroup, listObject).children)
  }, [listObject, listGroup])
  // flattenedItems except active item and collapsed item
  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );
  }, [activeId, items]);
  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [
    flattenedItems,
  ]);
  const projected =
    activeId && overId
      ? getProjection(
        flattenedItems,
        activeId,
        overId,
        offsetLeft,
        indentationWidth
      )
      : null;

  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement('onDragMove', active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement('onDragOver', active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement('onDragEnd', active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    },
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter,
    // })
  );

  return <DndContext
    accessibility={{ announcements }}
    sensors={sensors}
    collisionDetection={closestCenter}
    measuring={measuring}
    onDragStart={handleDragStart}
    onDragMove={handleDragMove}
    onDragOver={handleDragOver}
    onDragEnd={handleDragEnd}
    onDragCancel={handleDragCancel}

  >
    <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
      {flattenedItems.map(({ id, children, collapsed, depth, _id, type, locked }) => (
        <SortableTreeItem
          key={id}
          id={id}
          _id={_id}
          type={type}
          value={`${id}`}
          locked={locked}
          depth={id === activeId && projected ? projected.depth : depth}
          indentationWidth={indentationWidth}
          indicator={indicator}
          collapsed={Boolean(collapsed && children.length)}
          onCollapse={
            collapsible && children.length
              ? () => handleCollapse(id)
              : undefined
          }
          onRemove={removable ? () => handleRemove(id, _id, type) : undefined}
        />
      ))}
      {createPortal(
        <DragOverlay
          dropAnimation={dropAnimationConfig}
          modifiers={indicator ? [adjustTranslate] : undefined}
        >
          {activeId && activeItem ? (
            <SortableTreeItem
              id={activeId}
              _id={activeItem._id}
              type={activeItem.type}
              depth={activeItem.depth}
              locked={activeItem.locked}
              clone
              childCount={getChildCount(items, activeId) + 1}
              value={activeId.toString()}
              indentationWidth={indentationWidth}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </SortableContext>

  </DndContext>

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId)
    setOverId(activeId)

    const activeItem = flattenedItems.find(({ id }) => id === activeId);
    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      })
    }
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();
    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const oldFlattendItem = JSON.parse(
        JSON.stringify(flattenTree(items))
      )
      const activeID = active.data.current._id
      const activeType = active.data.current.type
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      // update new index
      sortedItems.forEach((sorted, index) => sorted.index = index)
      const newActiveItem = sortedItems.find(item => item.id === active.id)
      const parentNewActiveItem = clonedItems.find(item => item.id === newActiveItem.parentId)
      
      // deny change locked group
      if(newActiveItem?.locked) return
      // deny move to locked group
      if(parentNewActiveItem?.locked) return


      // get new position changed element
      const changePositionObject = sortedItems.filter(
        (sorted) => oldFlattendItem.find(clone => clone.id === sorted.id)?.index !== sorted.index && sorted.type !== "group")
      const changePositionGroup = sortedItems.filter(
        (sorted) => oldFlattendItem.find(clone => clone.id === sorted.id)?.index !== sorted.index && sorted.type === "group")

      //allow only move to group parent
      if (parentNewActiveItem?.type && parentNewActiveItem?.type !== "group") return;

      if (activeType === "group") {
        const newListGroup = listGroup.map(group => {
          let item = { ...group }
          if (group.id === activeID) {
            item.parent = parentNewActiveItem ? parentNewActiveItem._id : listGroup[0].id
          }

          //update item change position
          const newIndexItem = changePositionGroup.find(changed => changed._id === group.id)
          if(newIndexItem) {
            item.index = newIndexItem.index
          }
          return item
        })
        setListGroup(newListGroup)
      } else {
        const newListObject = listObject.map(object => {
          let item = { ...object }
          if (object.id === activeID) {
            object.group = parentNewActiveItem ? parentNewActiveItem._id : listGroup[0].id
            
          } 
          //update item change position
          const newIndexItem = changePositionObject.find(changed => changed._id === object.id)
          if(newIndexItem) {
            object.index = newIndexItem.index
          }
          return object
        })
        setListObject(newListObject)
      }
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function handleCollapse(id: UniqueIdentifier) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }

  function handleRemove(id: UniqueIdentifier, _id: string, type: string) {
    console.log(_id, type)
    if (type === "group") {
      const newListGroup = listGroup.filter(g => g.id !== _id)
      setListGroup(newListGroup)
    } else {
      const newListObject = listObject.filter(o => o.id !== _id)
      setListObject(newListObject)
    }
    setItems((items) => removeItem(items, id));
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: UniqueIdentifier,
    overId?: UniqueIdentifier
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: UniqueIdentifier | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}