import { Shape } from 'react-konva';
import { ComponentProps, FC } from 'react';

export type GridHorizontalLineProps = ComponentProps<typeof Shape> & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export const GridHorizontalLine: FC<GridHorizontalLineProps> = (props) => {
  return (
    <Shape
      draggable
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(props.x1, props.y1);
        context.lineTo(props.x2, props.y2);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      stroke="rgba(0, 0, 0, 0.1)"
      strokeWidth={1}
      {...props}
    />
  );
};
