import { Group, Rect, Transformer } from 'react-konva';
import { useMemo, useCallback, useState, useRef, forwardRef, ComponentProps, MutableRefObject, useEffect } from 'react';
import { getTree } from '../helper/helper';
import { Group as GroupType, ObjectShape } from '../enum/index';
import Konva from 'konva';

export type TreeNodeProps = ComponentProps<typeof Group>;
export type TreeNodeRef = Konva.Group;

export const TreeNode = forwardRef<TreeNodeRef, TreeNodeProps>(
  ({ listObject,
    setListObject,
    listGroup,
    setListGroup,
    currentGroup,
  }, ref: MutableRefObject<TreeNodeRef | null>) => {

    const treeNode = useMemo(() => {
      return getTree(currentGroup, listGroup, listObject)
    }, [currentGroup, listGroup, listObject])

    const gRef = useRef<Konva.Group>(null);
    const currentRef = gRef ?? ref;
    const trRef = useRef<Konva.Transformer>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
      if (currentRef.current && isSelected) {
        trRef.current?.setNodes([currentRef.current]);
        trRef.current?.getLayer()?.batchDraw();
      }
    }, [currentRef, isSelected]);

    const snapObjectHandler = useCallback((e) => {
      const desk = e.target;
      desk.position({
        x: Math.round(desk.x() / 50) * 50,
        y: Math.round(desk.y() / 50) * 50,
      });
      e.target.getStage().batchDraw();
    }, [])

    return (<>
      <Group
        ref={currentRef}
        onClick={() => {
          if(currentGroup.parent === "0") {
            setIsSelected(!isSelected);
          }
        }}
        draggable={currentGroup.parent === "0"}
        onDragMove={snapObjectHandler}
        onDragEnd={snapObjectHandler}
      >
        {treeNode.children.map(child => {
          //object or empty group
          if (!child.children.length)
            switch (child.type) {
              case "rect": {
                const [x = 0, y = 0, width = 50, height = 50] = child.position;
                return (<Rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="#ffffff"
                  stroke="#000000"
                  draggable={currentGroup.id === "0"}
                  onDragMove={snapObjectHandler}
                  onDragEnd={snapObjectHandler}
                  key={child.id}
                />)
              }
            }
          else if (child.type === "group") {
            return (<TreeNode
              listObject={listObject}
              listGroup={listGroup}
              setListObject={setListObject}
              setListGroup={setListGroup}
              currentGroup={listGroup.find(g => `group-${g.id}` === child.id)}
              key={child.id}
            ></TreeNode>)
          }
        })}
      </Group>
      {isSelected && (
        <Transformer
          boundBoxFunc={(oldBoundBox, newBoundBox) => {
            if (Math.abs(newBoundBox.rotation % (Math.PI / 4)) > 0) {
              return oldBoundBox;
            }
            return newBoundBox;
          }}
          rotationSnaps={[0, 90, 180, 270]}
          ref={trRef}
          resizeEnabled={false}
        />
      )}
    </>)
  })