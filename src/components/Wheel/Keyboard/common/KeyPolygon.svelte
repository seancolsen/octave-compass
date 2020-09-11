<script lang="ts">
  import { Scalar } from '../../../../Utils/Math/Scalar';
  import { IrPoint } from '../../../../Utils/Geometry/IrPoint';
  import { Pitch } from '../../../../Utils/Music/Pitch';
  import Polygon from '../../common/Polygon.svelte';
  import { keyboardRadius } from '../../../../store';

  let className = undefined as string | undefined;
  export {className as class};
  export let interval: number;

  $: innerRadius = $keyboardRadius - 131;
  $: shape = [
    [-0.5, $keyboardRadius * Scalar.rFactorAtEdge],
    [0, $keyboardRadius],
    [0.5, $keyboardRadius * Scalar.rFactorAtEdge],
    [0.5, innerRadius * Scalar.rFactorAtEdge],
    [0, innerRadius],
    [-0.5, innerRadius * Scalar.rFactorAtEdge],
  ] as [number, number][];
  $: points = shape.map(ir =>
    IrPoint.fromArray(ir).plusI(interval)
  );
</script>

<Polygon points={points} class={className}/>
