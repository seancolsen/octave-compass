<script lang="ts">
  import { XyPoint } from './../../../Utils/Geometry/XyPoint';
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  export let points: IrPoint[];
  export let fill: string;
  export let opacity = 1;
  let pointsString = XyPoint.stringFromIrArray(points);
</script>

<polygon points={pointsString} {fill} {opacity} />
