<script lang="ts">

</script>

<!-- import React from 'react';
import { Angle } from '../../../Utils/Geometry/Angle';

interface Props extends React.SVGProps<SVGGElement>{
  rotation: number | null;
}

export const Group = React.forwardRef((props: Props, ref: React.Ref<SVGGElement>) => {
  const {rotation, ...groupProps} = props;
  let rotationDeg = Angle.iToD(rotation || 0);
  let transformString = `rotate(${rotationDeg})`;
  return (
    <g
      transform={transformString}
      {...groupProps}
      ref={ref}
    >
      {props.children}
    </g>
  );
}) -->
