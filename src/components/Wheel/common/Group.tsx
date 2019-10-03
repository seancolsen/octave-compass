import React, { ReactNode } from 'react';
import { Angle } from '../../../Utils/Geometry/Angle';

interface Props {
  rotation: number;
  onMouseDown: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onTouchStart: (event: React.TouchEvent<SVGGElement>) => void;
  transform: string;
  children: ReactNode
}

export function Group(props: Props) {
  let rotation = Angle.iToD(props.rotation || 0);
  let transformString = `rotate(${rotation})`;
  return (
    <g
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      transform={transformString}
    >
      {props.children}
    </g>
  );
}
