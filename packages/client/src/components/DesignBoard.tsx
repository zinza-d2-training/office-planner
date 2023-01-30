import { PersonalSeat } from '@client/components/objects';
import {
  DeskProps,
  GridHorizontalLine,
  GridVerticalLine,
} from '@client/components/shapes';
import Konva from 'konva';
import { useCallback, useMemo, useRef } from 'react';
import { Layer, Stage, StageProps } from 'react-konva';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => `${props.width}px` || '960px'};
  height: ${(props) => `${props.height}px` || '640px'};
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid grey;
`;

export const DesignBoard = () => {
  const containerWidth = 960;
  const containerHeight = 640;
  const canvasWidth = 1200;
  const canvasHeight = 1000;
  const gridSpacing = 50;
  const boundHorizontal = containerWidth - canvasWidth;
  const boundVertical = containerHeight - canvasHeight;
  const stageRef = useRef<Konva.Stage>();

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

  const calculateX = (x: number) =>
    x > 0 ? 0 : x < boundHorizontal ? boundHorizontal : x;
  const calculateY = (y: number) =>
    y > 0 ? 0 : y < boundVertical ? boundVertical : y;

  const handleStageDragMove: StageProps['onDragMove'] = (e) => {
    const stage = e.currentTarget;
    const newX = calculateX(stage.x());
    const newY = calculateY(stage.y());
    stage.position({
      x: newX,
      y: newY,
    });
    stageRef.current.batchDraw();
  };

  const handleStageDragEnd: StageProps['onDragEnd'] = (e) => {
    const stage = e.currentTarget;
    const newX = calculateX(stage.x());
    const newY = calculateY(stage.y());
    stage.position({
      x: newX,
      y: newY,
    });
    stageRef.current.batchDraw();
  };

  return (
    <Container width={containerWidth} height={containerHeight}>
      <Stage
        draggable
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        onDragMove={handleStageDragMove}
        onDragEnd={handleStageDragEnd}
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
    </Container>
  );
};
