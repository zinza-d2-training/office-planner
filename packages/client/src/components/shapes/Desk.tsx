import { Group, Rect } from 'react-konva';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';
import Konva from 'konva';
import clsx from 'clsx';
import { ShapeClassName } from '@client/configs';

export type DeskProps = ComponentProps<typeof Group>;
export type DeskRef = Konva.Group;

export const Desk = forwardRef<DeskRef, DeskProps>(
  ({ name, ...props }, ref: MutableRefObject<DeskRef | null>) => {
    return (
      <Group
        ref={ref}
        {...props}
        name={clsx(ShapeClassName.FixedShape, ShapeClassName.Desk, name)}
      >
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          x={0}
          y={0}
          width={260}
          height={104}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth={1}
        />
      </Group>
    );
  }
);
