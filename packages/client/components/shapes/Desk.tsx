import { Shape } from 'react-konva';
import { ComponentProps, FC } from 'react';

export type DeskProps = ComponentProps<typeof Shape>;

export const Desk: FC<DeskProps> = (props) => {
  return (
    <Shape
      draggable
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.rect(0, 0, 250, 100);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill="#ffffff"
      stroke="black"
      strokeWidth={1}
      {...props}
    />
  );
};
