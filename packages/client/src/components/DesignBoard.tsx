import { Layer, Stage } from 'react-konva';
import {
  DeskProps,
  GridHorizontalLine,
  GridVerticalLine,
} from '@client/components/shapes';
import { useCallback, useMemo, useRef } from 'react';
import { PersonalSeat } from '@client/components/objects';

export const DesignBoard = () => {
  const canvasWidth = 1000;
  const canvasHeight = 500;
  const gridSpacing = 50;
  const stageRef = useRef();

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
      </Layer>
    </Stage>
  );
};
