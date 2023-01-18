import { Shape } from 'react-konva';
import { ComponentProps, FC } from 'react';

export type ChairProps = ComponentProps<typeof Shape>;

export const Chair: FC<ChairProps> = (props) => {
  return (
    <Shape
      // draggable
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.rect(0, 0, 50, 50);
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
