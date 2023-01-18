import { Shape } from 'react-konva';
import { ComponentProps, FC } from 'react';

export type MonitorProps = ComponentProps<typeof Shape>;

export const Monitor: FC<MonitorProps> = (props) => {
  return (
    <Shape
      // draggable
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.rect(0, 0, 75, 5);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill="#ccc"
      stroke="black"
      strokeWidth={1}
      {...props}
    />
  );
};
