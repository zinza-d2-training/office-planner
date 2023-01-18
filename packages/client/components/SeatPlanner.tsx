import { Seater } from 'packages/client/components/Seater';
import { Chair, ChairProps } from 'packages/client/components/shapes/Chair';
import { Desk, DeskProps } from 'packages/client/components/shapes/Desk';
import { GridHorizontalLine } from 'packages/client/components/shapes/GridHorizontalLine';
import { GridVerticalLine } from 'packages/client/components/shapes/GridVerticalLine';
import {
  Monitor,
  MonitorProps,
} from 'packages/client/components/shapes/Monitor';
import data from 'packages/client/data';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';

export const SeatPlanner = () => {
  const canvasWidth = 1000;
  const canvasHeight = 500;
  const gridSpacing = 50;
  const deskWidth = gridSpacing * 5;
  const deskHeight = gridSpacing * 2;
  const stageRef = useRef();
  const [seaterSelectedId, setSeaterSelectedId] = useState(null);

  const transformMap = {
    south: 0,
    north: -180,
    east: -90,
    west: 90,
    'north-east': -135,
    'south-west': 45,
    'south-east': -45,
    'north-west': 135,
  };

  const equipmentsComponents: {
    chair: ChairProps;
    monitor: MonitorProps;
    desk: DeskProps;
  } = {
    chair: <Chair x={100} y={100} />,
    monitor: <Monitor x={80} />,
    desk: <Desk />,
  };

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
      x: Math.round(desk.x() / (gridSpacing / 2)) * (gridSpacing / 2),
      y: Math.round(desk.y() / (gridSpacing / 2)) * (gridSpacing / 2),
    });
    e.target.getStage().batchDraw();
  }, []);

  const handleDeskDragEnd: DeskProps['onDragEnd'] = useCallback((e) => {
    const desk = e.target;
    desk.position({
      x: Math.round(desk.x() / (gridSpacing / 2)) * (gridSpacing / 2),
      y: Math.round(desk.y() / (gridSpacing / 2)) * (gridSpacing / 2),
    });
    e.target.getStage().batchDraw();
  }, []);

  return (
    <Stage ref={stageRef} width={canvasWidth} height={canvasHeight}>
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
      <Layer>
        {data.map((seater) => {
          const x = deskWidth * seater.x;
          const y = deskHeight * seater.y;
          return (
            <Seater
              key={seater.id}
              x={x}
              y={y}
              rotation={transformMap[seater.direction]}
              isSelected={seater.id === seaterSelectedId}
              onClick={() => setSeaterSelectedId(seater.id)}
              onDragMove={handleDeskDragMove}
              onDragEnd={handleDeskDragEnd}
            >
              {seater.equipments.map((equipment) => {
                return equipmentsComponents[equipment.type];
              })}
            </Seater>
          );
        })}
      </Layer>
    </Stage>
  );
};
