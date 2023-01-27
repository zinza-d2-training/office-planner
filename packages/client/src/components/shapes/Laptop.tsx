import { ShapeClassName } from '@client/configs';
import clsx from 'clsx';
import Konva from 'konva';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';
import { Group, Rect, Shape } from 'react-konva';

export type LaptopProps = ComponentProps<typeof Group>;
export type LaptopRef = Konva.Group;

export const Laptop = forwardRef<LaptopRef, LaptopProps>(
  ({ name, ...props }, ref: MutableRefObject<LaptopRef | null>) => {
    return (
      <Group
        ref={ref}
        {...props}
        name={clsx(ShapeClassName.FixedShape, ShapeClassName.Laptop, name)}
      >
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={103}
          height={3}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.7}
          x={73}
          y={15}
          rx="2"
          ry="2"
        />
        <Shape
          name={clsx(ShapeClassName.FixedShapeElement)}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(78, 32);
            context.lineTo(171, 32);
            context.lineTo(176, 17);
            context.lineTo(73, 17);
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          stroke="black"
          strokeWidth={0.5}
        />
        <Shape
          name={clsx(ShapeClassName.FixedShapeElement)}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(80, 30);
            context.lineTo(169, 30);
            context.lineTo(173, 19);
            context.lineTo(76, 19);
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          stroke="black"
          strokeWidth={0.5}
        />

        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={93}
          height={58}
          fill="#e1e1e1"
          stroke="black"
          strokeWidth={0.7}
          x={78}
          y={33}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={20}
          height={12}
          fill="#e1e1e1"
          stroke="black"
          strokeWidth={0.7}
          x={114}
          y={72}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={52}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={98}
          y={61}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={84}
          y={61}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={91}
          y={61}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={154}
          y={61}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={161}
          y={61}
          rx="1"
          ry="1"
        />

        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={18}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={84}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={105}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={112}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={119}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={126}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={133}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={140}
          y={53}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={18}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={147}
          y={53}
          rx="1"
          ry="1"
        />

        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={11}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={84}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={98}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={105}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={112}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={119}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={126}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={133}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={140}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={4}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={147}
          y={45}
          rx="1"
          ry="1"
        />
        <Rect
          name={clsx(ShapeClassName.FixedShapeElement)}
          width={11}
          height={4}
          fill="#a5a5a5"
          stroke="black"
          strokeWidth={0.5}
          x={154}
          y={45}
          rx="1"
          ry="1"
        />
        <Shape
          name={clsx(ShapeClassName.FixedShapeElement)}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(124, 78);
            context.lineTo(124, 83);
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
