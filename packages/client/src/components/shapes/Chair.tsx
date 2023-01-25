import { Group, Line, Rect } from 'react-konva';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';
import Konva from 'konva';
import { ShapeClassName } from '@client/configs';
import clsx from 'clsx';

export type ChairProps = ComponentProps<typeof Group>;
export type ChairRef = Konva.Group;

export const Chair = forwardRef<ChairRef, ChairProps>(
  ({ name, ...props }, ref: MutableRefObject<ChairRef | null>) => {
    return (
      <Group
        ref={ref}
        {...props}
        name={clsx(ShapeClassName.FixedShape, ShapeClassName.Chair, name)}
      >
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          x={8}
          y={0}
          width={70}
          height={75}
          fill="#1a2980"
          stroke="#000000"
          strokeWidth={0.7}
          cornerRadius={25}
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          x={12}
          y={72}
          width={60}
          height={12}
          fill="#a5a5a5"
          stroke="#000000"
          strokeWidth={0.7}
          cornerRadius={15}
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          x={0}
          y={15}
          width={10}
          height={40}
          fill="#a5a5a5"
          stroke="#000000"
          strokeWidth={0.7}
          cornerRadius={3}
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          x={76}
          y={15}
          width={10}
          height={40}
          fill="#a5a5a5"
          stroke="#000000"
          strokeWidth={0.7}
          cornerRadius={3}
        />
        <Line
          points={[13, 78, 71, 78]}
          fill="#5b5b5b"
          stroke="#000000"
          strokeWidth={0.7}
          cornerRadius={3}
        />
      </Group>
    );
  }
);
