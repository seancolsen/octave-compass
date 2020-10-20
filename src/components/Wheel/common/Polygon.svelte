<script lang="ts">
  import { XyPoint } from './../../../Utils/Geometry/XyPoint';
  import type { IrPoint } from '../../../Utils/Geometry/IrPoint';
  
  let className = undefined as string | undefined;
  export {className as class};
  export let points: IrPoint[];
  export let fill: string | undefined = undefined;
  export let opacity = 1;
  export let id = '';
  
  $: pointsString = XyPoint.stringFromIrArray(points);
</script>

<polygon points={pointsString} {fill} {opacity} class={className} {id} />
