import { PersonalSeat } from '@client/components/objects';
import {
  DeskProps,
  GridHorizontalLine,
  GridVerticalLine,
} from '@client/components/shapes';
import Konva from 'konva';
import { useCallback, useMemo, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => `${props.width}px` || '1200px'};
  height: ${(props) => `${props.height}px` || '1000px'};
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: ${(props) => `calc(${props.width}px - 22px)`};
  height: ${(props) => `calc(${props.height}px - 22px)`};
  overflow: auto;
  margin: 10px auto 0;
  border: 1px solid grey;
`;

export const DesignBoard = () => {
  const canvasWidth = 1200;
  const canvasHeight = 1000;
  const gridSpacing = 50;
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

  const handleScrollBoardContainer = (e) => {
    const boardContainer = e.target;
    const dx = boardContainer.scrollLeft;
    const dy = boardContainer.scrollTop;
    stageRef.current.container().style.transform =
      'translate(' + dx + 'px, ' + dy + 'px)';
    stageRef.current.x(-dx);
    stageRef.current.y(-dy);
  };

  return (
    <ScrollContainer
      onScroll={handleScrollBoardContainer}
      width={960}
      height={640}
    >
      <Container width={canvasWidth} height={canvasHeight}>
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
      </Container>
    </ScrollContainer>
  );
};
