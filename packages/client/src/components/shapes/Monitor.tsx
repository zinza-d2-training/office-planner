import { ShapeClassName } from '@client/configs';
import clsx from 'clsx';
import Konva from 'konva';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';
import { Group, Rect } from 'react-konva';

export type MonitorProps = ComponentProps<typeof Group>;
export type MonitorRef = Konva.Group;

export const Monitor = forwardRef<MonitorRef, MonitorProps>(
  ({ name, ...props }, ref: MutableRefObject<MonitorRef | null>) => {
    return (
      <Group
        ref={ref}
        {...props}
        name={clsx(ShapeClassName.FixedShape, ShapeClassName.Monitor, name)}
      >
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={103}
          height={4}
          stroke="black"
          fill="#a5a5a5"
          x={73}
          y={20}
          strokeWidth={0.7}
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={30}
          height={14}
          stroke="black"
          fill="#e1e1e1"
          x={111}
          y={15}
          strokeWidth={0.7}
        />
      </Group>
    );
  }
);
