import { Group, Transformer } from 'react-konva';
import {
  ComponentProps,
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Konva from 'konva';
import clsx from 'clsx';
import { ShapeClassName } from '@client/configs';
import { Chair, Desk } from '@client/components/shapes';

export type PersonalSeatProps = ComponentProps<typeof Group>;
export type PersonalSeatRef = Konva.Group;

export const PersonalSeat = forwardRef<PersonalSeatRef, PersonalSeatProps>(
  ({ name, ...props }, ref: MutableRefObject<PersonalSeatRef | null>) => {
    const gRef = useRef<Konva.Group>(null);
    const currentRef = gRef ?? ref;
    const trRef = useRef<Konva.Transformer>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
      if (currentRef.current && isSelected) {
        trRef.current?.setNodes([currentRef.current]);
        trRef.current?.getLayer()?.batchDraw();
      }
    }, [currentRef, isSelected]);

    return (
      <>
        <Group
          ref={currentRef}
          onClick={() => {
            setIsSelected(!isSelected);
          }}
          name={clsx(
            ShapeClassName.FixedShape,
            ShapeClassName.PersonalSeat,
            { [ShapeClassName.Selected]: isSelected },
            name
          )}
          {...props}
        >
          <Chair x={82} y={90} />
          <Desk />
        </Group>
        {isSelected && (
          <Transformer
            boundBoxFunc={(oldBoundBox, newBoundBox) => {
              if (Math.abs(newBoundBox.rotation % (Math.PI / 4)) > 0) {
                return oldBoundBox;
              }
              return newBoundBox;
            }}
            rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315, 360]}
            ref={trRef}
            resizeEnabled={false}
          />
        )}
      </>
    );
  }
);
