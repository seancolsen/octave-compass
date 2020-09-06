<script lang="ts">
  import { XyPoint } from './../../../Utils/Geometry/XyPoint';
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  
  let className: string | undefined = undefined;
  export {className as class};
  export let points: IrPoint[];
  export let fill: string | undefined = undefined;
  export let opacity = 1;
  
  let pointsString = XyPoint.stringFromIrArray(points);
</script>

<polygon points={pointsString} {fill} {opacity} class={className} />
