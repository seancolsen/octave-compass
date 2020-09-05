<script lang="ts">
  import Polygon from "../Wheel/common/Polygon.svelte";
  import { IrPoint } from "./../../Utils/Geometry/IrPoint";
  import { IntervalSet } from '../../Utils/Music/IntervalSet';

  export let intervalSet: IntervalSet;
  export let radius: number;
  export let fill: string;
  export let opacity: number = 1;

  const intervals = intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, radius]));
</script>

<Polygon {points} {fill} {opacity} />
