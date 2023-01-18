import {
  ComponentProps,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { Group, Transformer } from 'react-konva';

export type SeaterProps = {
  isSelected: boolean;
} & PropsWithChildren<ComponentProps<typeof Group>>;

export const Seater: FC<SeaterProps> = (props) => {
  const { children, isSelected } = props;
  const seaterRef = useRef();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      trRef?.current?.nodes([seaterRef.current]);
      trRef?.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Group draggable ref={seaterRef} {...props}>
        {children}
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          centeredScaling={true}
          resizeEnabled={false}
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270]}
        />
      )}
    </>
  );
};
