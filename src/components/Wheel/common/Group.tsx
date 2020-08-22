import React from 'react';
import { Angle } from '../../../Utils/Geometry/Angle';

interface Props extends React.SVGProps<SVGGElement>{
  rotation: number | null;
}

export function Group(props: Props) {
  const {rotation, ...groupProps} = props;
  let rotationDeg = Angle.iToD(rotation || 0);
  let transformString = `rotate${rotationDeg})`;
  return (
    <g
      transform={transformString}
      {...groupProps}
    >
      {props.children}
    </g>
  );
}
