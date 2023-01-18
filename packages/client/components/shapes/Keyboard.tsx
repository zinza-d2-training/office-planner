import { Shape } from 'react-konva';
import { ComponentProps, FC } from 'react';

export type KeyboardProps = ComponentProps<typeof Shape>;

export const Keyboard: FC<KeyboardProps> = (props) => {
  return (
    <Shape
      // draggable
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.rect(0, 0, 75, 25);
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
