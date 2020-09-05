<script lang="ts">

</script>

<!-- import React from 'react';
import { Scalar } from '../../../../Utils/Math/Scalar';
import { IrPoint } from '../../../../Utils/Geometry/IrPoint';
import { Polygon } from '../../common/Polygon';
import { Pitch } from '../../../../Utils/Music/Pitch';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../Store';

export interface KeyPolygonProps {
  pitch: Pitch;
  className?: string;
}

export const KeyPolygon = observer((props: KeyPolygonProps) =>{
  const store = useStore();
  const innerRadius = store.editVsPlay * 308;
  const outerRadius = 400 + 40 * store.editVsPlay;
  const shape: [number, number][] = [
    [-0.5, outerRadius * Scalar.rFactorAtEdge],
    [0, outerRadius],
    [0.5, outerRadius * Scalar.rFactorAtEdge],
    [0.5, innerRadius * Scalar.rFactorAtEdge],
    [0, innerRadius],
    [-0.5, innerRadius * Scalar.rFactorAtEdge],
  ];
  const points = shape.map(ir =>
    IrPoint.fromArray(ir).plusI(props.pitch.note.id)
  );
  return <Polygon points={points} className={props.className}/>;
}); -->
