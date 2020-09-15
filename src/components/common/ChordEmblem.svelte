<script lang='ts'>
  import { Angle } from '../../Utils/Geometry/Angle';
  import { Chord } from '../../Utils/Music/Chord';
  import { scaleRotatorStores } from '../Wheel/Wheel.svelte'
  const {rotation} = scaleRotatorStores;
  
  export let size: number;
  export let chord: Chord;
  export let noteName: string | undefined = undefined;
  export let opacity = 1;
  $: fontSize = size * chord.textSizeFactor * 0.85;
  $: transform = `rotate(${-Angle.iToD($rotation)})`;
</script>

<g {opacity} {transform}>
  <circle
    cx={0} cy={0}
    r={size}
    fill={chord.color}
  />
  <text
    x={0} y={0}
    dominant-baseline='middle'
    text-anchor='middle'
    font-size={`${fontSize}px`}
  >
    {@html chord.contents(noteName)}
  </text>
</g>

<style>
  text { fill: white;}
  text > :global(tspan.bold) { font-weight: bold; }
  text > :global(tspan.italic) { font-style: italic; }
</style>