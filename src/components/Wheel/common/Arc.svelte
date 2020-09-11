<script lang="ts">
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';

  let className = undefined as string | undefined;
  export {className as class};
  export let startInterval: number;
  export let endInterval: number;
  export let radius: number;
  export let id: string | undefined = undefined;
  export let color: string | undefined = undefined;
  
  $: d = (() => {
    const startPoint = (new IrPoint(startInterval, radius)).toXy();
    const endPoint = (new IrPoint(endInterval, radius)).toXy();
    const sweepFlag = startInterval < endInterval ? 1 : 0;
    return [
      "M", startPoint.x, startPoint.y,
      "A", radius, radius, 0, 0, sweepFlag, endPoint.x, endPoint.y
    ].join(" ");
  })();
</script>

<path {d} class={className} {id} stroke={color} />
