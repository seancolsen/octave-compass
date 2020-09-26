<script context="module" lang="ts">
  import {musicTheory} from "./../../../Data/musicTheory";

  /**
   * When 1, the key will extend laterally all the way to the mid point between
   * intervals. When 0, the key won't extend at all and will have zero area.
   * When 0.5, the key will extend half way towards the mid point between
   * intervals.
   */
  export const lateralExtensionFactor = 0.85;

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
  import Polygon from '../common/Polygon.svelte';
  import {getStore} from '../../../store';
  const {keyboardRadius} = getStore();

  let className = undefined as string | undefined;
  export {className as class};
  export let interval: number;

  $: innerRadius = $keyboardRadius - 131;

  $: shape = [
    [-0.5 * lateralExtensionFactor, $keyboardRadius * radiusFactorAtEdge],
    [0, $keyboardRadius],
    [0.5 * lateralExtensionFactor, $keyboardRadius * radiusFactorAtEdge],
    [0.5 * lateralExtensionFactor, innerRadius * radiusFactorAtEdge],
    [0, innerRadius],
    [-0.5 * lateralExtensionFactor, innerRadius * radiusFactorAtEdge],
  ] as [number, number][];
  $: points = shape.map(ir =>
    IrPoint.fromArray(ir).plusI(interval)
  );
</script>

<Polygon points={points} class={className}/>
