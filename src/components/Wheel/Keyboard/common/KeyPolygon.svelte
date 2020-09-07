<script lang="ts">
  import { Scalar } from '../../../../Utils/Math/Scalar';
  import { IrPoint } from '../../../../Utils/Geometry/IrPoint';
  import { Pitch } from '../../../../Utils/Music/Pitch';
  import Polygon from '../../common/Polygon.svelte';
  import { editVsPlay } from '../../../../store';

  let className: string | undefined = undefined;
  export {className as class};
  export let pitch: Pitch;

  $: innerRadius = $editVsPlay * 308;
  $: outerRadius = 400 + 40 * $editVsPlay;
  $: shape = [
    [-0.5, outerRadius * Scalar.rFactorAtEdge],
    [0, outerRadius],
    [0.5, outerRadius * Scalar.rFactorAtEdge],
    [0.5, innerRadius * Scalar.rFactorAtEdge],
    [0, innerRadius],
    [-0.5, innerRadius * Scalar.rFactorAtEdge],
  ] as [number, number][];
  $: points = shape.map(ir =>
    IrPoint.fromArray(ir).plusI(pitch.note.id)
  );
</script>

<Polygon points={points} class={className}/>
