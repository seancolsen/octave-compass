<script lang="ts">

</script>

<!-- import React from 'react';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';

export interface ArcProps {
  startInterval: number;
  endInterval: number;
  radius: number;
  className?: string;
  id?: string;
}

export function Arc(props: ArcProps) {

  const d = (() => {
    const startInterval = props.startInterval;
    const endInterval = props.endInterval;
    const radius = props.radius;
    const startPoint = (new IrPoint(startInterval, radius)).toXy();
    const endPoint = (new IrPoint(endInterval, radius)).toXy();
    const sweepFlag = startInterval < endInterval ? 1 : 0;
    return [
      "M", startPoint.x, startPoint.y,
      "A", radius, radius, 0, 0, sweepFlag, endPoint.x, endPoint.y
    ].join(" ");
  })();

  return (
    <path d={d} className={props.className} id={props.id}/>
  );

} -->
