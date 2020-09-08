<script lang='ts'>
  import { Chord } from '../../Utils/Music/Chord';
  export let size: number;
  export let chord: Chord;
  export let noteName: string | undefined = undefined;
  export let opacity = 1;
  $: fontSize = size * chord.textSizeFactor * 0.85;
</script>

<g {opacity}>
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