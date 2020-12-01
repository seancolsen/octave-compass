<script context="module" lang="ts">
  import {musicTheory} from "./../../../Data/musicTheory";

  /**
   * When 1, the key will extend laterally all the way to the mid point between
   * intervals. When 0, the key won't extend at all and will have zero area.
   * When 0.5, the key will extend half way towards the mid point between
   * intervals.
   */
  const lateralExtensionFactor = 0.7;

  
  /**
   * The factor by which a radius should be reduced when it lies on the
   * edge between two keys. We want to reduce it so that we get straight lines
   * between keys.
   */
  const radiusFactorAtEdge = Math.cos(
    lateralExtensionFactor * Math.PI / musicTheory.octaveDivisions
  );
</script>

<script lang="ts">
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import {getStore} from '../../../store';
  import { XyPoint } from "../../../Utils/Geometry/XyPoint";
  const {keyboardRadius} = getStore();

  let className = undefined as string | undefined;
  export {className as class};
  export let interval: number;

  $: outerRadius = $keyboardRadius - 15; // half of stroke width
  $: innerRadius = outerRadius - 100;

  $: shape = [
    [-0.5 * lateralExtensionFactor, outerRadius * radiusFactorAtEdge],
    [0, outerRadius],
    [0.5 * lateralExtensionFactor, outerRadius * radiusFactorAtEdge],
    [0.5 * lateralExtensionFactor, innerRadius * radiusFactorAtEdge],
    [0, innerRadius],
    [-0.5 * lateralExtensionFactor, innerRadius * radiusFactorAtEdge],
  ] as [number, number][];
  $: points = shape.map(ir =>
    IrPoint.fromArray(ir).plusI(interval)
  );
  $: pointsString = XyPoint.stringFromIrArray(points);
</script>

<polygon
  filter="url('#shadow-when-play')"
  points={pointsString}
  class={className}
/>

<style>
  polygon {
    stroke-width: 30px;
    stroke-linejoin: round;
  }
</style>
