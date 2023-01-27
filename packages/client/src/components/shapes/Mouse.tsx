import { ShapeClassName } from '@client/configs';
import clsx from 'clsx';
import Konva from 'konva';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';
import { Group, Rect, Shape } from 'react-konva';

export type MouseProps = ComponentProps<typeof Group>;
export type MouseRef = Konva.Group;

export const Mouse = forwardRef<MouseRef, MouseProps>(
  ({ name, ...props }, ref: MutableRefObject<MouseRef | null>) => {
    return (
      <Group
        ref={ref}
        {...props}
        name={clsx(ShapeClassName.FixedShape, ShapeClassName.Mouse, name)}
      >
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={12}
          height={20}
          x={184}
          y={71}
          fill="#e1e1e1"
          stroke="black"
          strokeWidth={0.7}
          cornerRadius={2}
        />
        <Shape
          name={clsx(ShapeClassName.FixedShapeElement)}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(190, 72);
            context.lineTo(190, 78);
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          stroke="black"
          strokeWidth={0.5}
        />
      </Group>
    );
  }
);
