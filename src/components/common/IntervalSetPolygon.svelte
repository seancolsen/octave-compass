<script lang="ts">
  import Polygon from "../Wheel/common/Polygon.svelte";
  import { IrPoint } from "./../../Utils/Geometry/IrPoint";
  import { IntervalSet } from '../../Utils/Music/IntervalSet';
  export let intervalSet: IntervalSet;
  export let radius: number;
  $: points = intervalSet.ordinals.map(i => IrPoint.fromArray([i, radius]));
</script>

<Polygon {points} {...$$restProps} />
