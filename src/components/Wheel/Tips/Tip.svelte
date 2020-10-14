<script lang='ts'>
  import { getStore } from "../../../store";
  import GlowingText from "../../common/GlowingText.svelte";
  import IntervalSetPolygon from "../../common/IntervalSetPolygon.svelte";
  const {intervalSet} = getStore();

  interface Point {x: number, y: number,}

  export let text: string;
  export let center: Point;
  export let width: number;
  export let height: number;
  export let targets: Point[];
  export let isTargetingScale = false as boolean;

  $: d = (target: Point) => 
    `M ${center.x}, ${center.y} L ${target.x} ${target.y}`;

</script>

<g>
  {#each targets as target}
    {#if isTargetingScale}
      <clipPath id='scale-polygon-clip'>
        <IntervalSetPolygon
          class='scale-polygon-clip'
          radius={300}
          intervalSet={$intervalSet}
        />
      </clipPath>
      <path class='target-line-bg' d={d(target)} />
      <circle class='target-dot-bg' cx={target.x} cy={target.y} r='30' />
    {/if}
    <circle class='target-dot' cx={target.x} cy={target.y} r='6' />
    <path class='target-line' d={d(target)} />
  {/each}
  <foreignObject
    x={center.x - width/2} y={center.y - width/2}
    width={width} height={height}
  >
    <div class='container'>
      <GlowingText {text}
        glowColor='#AAA'
        spreadRadius={0.4}
        blurRadius={0.2}
      />
    </div>
  </foreignObject>
</g>

<style>
  g {pointer-events: none;}
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 35px;
    line-height: 1em;
    text-align: center;
    color: #005a75;
    font-style: italic;
    
  }
  .container > :global(.glowing-text) {
    margin: 1em;
  }
  .target-line { fill: none; stroke: #005a75; stroke-width: 3px; }
  .target-line-bg {
    fill: none;
    stroke: #EEE;
    stroke-width: 30px;
    clip-path: url('#scale-polygon-clip');
  }
  .target-dot { fill: #005a75; }
  .target-dot-bg { fill: #EEE; }
</style>