<script lang="ts">
  import Polygon from "../Wheel/common/Polygon.svelte";
  import { IrPoint } from "./../../Utils/Geometry/IrPoint";
  import { IntervalSet } from '../../Utils/Music/IntervalSet';
  
  let className: string | undefined = undefined;
  export {className as class};
  export let intervalSet: IntervalSet;
  export let radius: number;
  export let fill: string | undefined = undefined;
  export let opacity: number = 1;

  $: points = intervalSet.ordinals.map(i => IrPoint.fromArray([i, radius]));
</script>

<Polygon {points} {fill} {opacity} class={className} />
