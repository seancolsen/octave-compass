<script lang="ts">
  import Polygon from "../Wheel/common/Polygon.svelte";
  import { IrPoint } from "./../../Utils/Geometry/IrPoint";
  import type { IntervalSet } from '../../Utils/Music/IntervalSet';

  let className = undefined as string | undefined;
  export {className as class};
  export let intervalSet: IntervalSet;
  export let radius: number;
  export let fill: string | undefined = undefined;

  $: points = intervalSet.ordinals.map(i => IrPoint.fromArray([i, radius]));
</script>

<Polygon {points} class={className} {...$$restProps} {fill} />
