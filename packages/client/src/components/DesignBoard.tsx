import { Layer, Rect, Stage } from 'react-konva';
import {
  DeskProps,
  GridHorizontalLine,
  GridVerticalLine,
} from '@client/components/shapes';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { PersonalSeat } from '@client/components/objects';
import { Group, ObjectShape } from 'packages/client/enum';
import { SideBar } from 'packages/client/components/sidebar/SideBar';
import { Navbar } from 'packages/client/components/navbar/Navbar';
import { TreeNode } from 'packages/client/components/TreeNode';

export type ToolKitType = "" | "retangle" | "circle" | "move"
const rootGroup = {
  id: "0",
  parent: null,
  index: null,
  locked: false,
};

export const DesignBoard = () => {
  const canvasWidth = 1000;
  const canvasHeight = 500;
  const gridSpacing = 50;
  const stageRef = useRef();

  const [selectedToolkit, setToolkit] = useState<ToolKitType>("")
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [listObject, setListObject] = useState<ObjectShape[]>([])
  const [listGroup, setListGroup] = useState<Group[]>([rootGroup])
  const [maxObjectID, setMaxObjectID] = useState(1)

  useEffect(() => {
    const initListGroup: Group[] = [
      {
        id: "0",
        parent: null,
        index: null,
        locked: false,
      },
      {
        id: "1",
        parent: "0",
        index: 0,
        locked: true,
      },
      {
        id: "2",
        parent: "1",
        index: 1,
        locked: false,
      },
      {
        id: "3",
        parent: "0",
        index: 5,
        locked: false,
      }
    ]

    const initListObject: ObjectShape[] = [
      {
        id: "1",
        position: [
          50, 50, 50, 50
        ],
        type: "rect",
        group: "2",
        index: 2,
      }, {
        id: "2",
        position: [
          150, 50, 50, 50
        ],
        type: "rect",
        group: "2",
        index: 3,

      },
      {
        id: "3",
        position: [
          150, 150, 50, 50
        ],
        type: "rect",
        group: "1",
        index: 4,
      }, {
        id: "4",
        position: [
          50, 150, 50, 50
        ],
        type: "rect",
        group: "0",
        index: 6,
      },
      {
        id: "5",
        position: [
          50, 250, 50, 50
        ],
        type: "rect",
        group: "0",
        index: 7
      }
    ]

    setListGroup(initListGroup)
    setListObject(initListObject)
    setMaxObjectID(initListObject.length + initListGroup.length - 2)
  }, [])

  const flattenedItems = useMemo(() => {

  }, [listObject, listGroup])

  const verticalLines = useMemo(() => {
    const lines: number[] = [];
    let i = 0;
    while (i <= canvasWidth) {
      lines.push(i);
      i = i + gridSpacing;
    }
    return lines;
  }, []);

  const horizontalLines = useMemo(() => {
    const lines: number[] = [];
    let i = 0;
    while (i <= canvasHeight) {
      lines.push(i);
      i = i + gridSpacing;
    }
    return lines;
  }, []);

  const handleDeskDragMove: DeskProps['onDragMove'] = useCallback((e) => {
    const desk = e.target;
    desk.position({
      x: Math.round(desk.x() / gridSpacing) * gridSpacing,
      y: Math.round(desk.y() / gridSpacing) * gridSpacing,
    });
    e.target.getStage().batchDraw();
  }, []);

  const handleDeskDragEnd: DeskProps['onDragEnd'] = useCallback((e) => {
    const desk = e.target;
    desk.position({
      x: Math.round(desk.x() / gridSpacing) * gridSpacing,
      y: Math.round(desk.y() / gridSpacing) * gridSpacing,
    });
    e.target.getStage().batchDraw();
  }, []);

  const roundPosition = (position: { x: number, y: number }) => {
    return {
      x: Math.round(position.x / gridSpacing) * gridSpacing,
      y: Math.round(position.y / gridSpacing) * gridSpacing,
    }
  }

  //event draw for stage board

  const mouseDownHandler = (e) => {
    const { x = 0, y = 0 } = roundPosition(e.target.getStage().getPointerPosition());

    if (!isDrawing) return
    switch (selectedToolkit) {
      case "retangle": {
        drawRectangle(x, y);
        break;
      }
    }
  }

  const mouseUpHandler = () => {
    if (!isDrawing) return
  }

  const mouseOverHandler = () => {
    if (!isDrawing) return
  }

  const mouseLeaveHandler = () => {

  }

  const drawRectangle = (x: number, y: number) => {
    const newRect: ObjectShape = {
      id: `${maxObjectID}`,
      position: [x - 50, y - 50, 100, 100],
      type: 'rect',
      group: rootGroup.id,
      index: maxObjectID,
    }
    setListObject([...listObject, newRect])
    setMaxObjectID(maxObjectID + 1)
    setIsDrawing(false)
    setToolkit('move')
  }

  return (
    <div>
      <Navbar
        selectedToolkit={selectedToolkit}
        setToolkit={setToolkit}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
      ></Navbar>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch"
      }}>
        <SideBar
          listObject={listObject}
          setListObject={setListObject}
          listGroup={listGroup}
          setListGroup={setListGroup}
        ></SideBar>
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={mouseDownHandler}
          onMouseUp={mouseUpHandler}
          onMouseMove={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <Layer>
            {verticalLines.map((line) => (
              <GridVerticalLine
                key={line}
                x1={line}
                y1={0}
                x2={line}
                y2={canvasHeight}
              />
            ))}
            {horizontalLines.map((line) => (
              <GridHorizontalLine
                key={line}
                x1={0}
                y1={line}
                x2={canvasWidth}
                y2={line}
              />
            ))}
          </Layer>
          {/* <Layer>
            <PersonalSeat
              x={100}
              y={100}
              draggable
              onDragMove={handleDeskDragMove}
              onDragEnd={handleDeskDragEnd}
            />
            <PersonalSeat
              x={400}
              y={100}
              draggable
              onDragMove={handleDeskDragMove}
              onDragEnd={handleDeskDragEnd}
            />
          </Layer> */}
          <Layer>
            <TreeNode
            listObject={listObject}
            setListObject={setListObject}
            listGroup={listGroup}
            setListGroup={setListGroup}
            currentGroup={listGroup[0]}
            key={0} 
            ></TreeNode>
          </Layer>
        </Stage>
      </div>

    </div>

  );
};
