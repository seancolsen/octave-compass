<script lang='ts'>
  import GlowingText from "../../common/GlowingText.svelte";

  interface Point {x: number, y: number,}

  export let text: string;
  export let center: Point;
  export let width: number;
  export let height: number;
  export let targets: Point[];

</script>

<g>
  {#each targets as target}
    <circle cx={target.x} cy={target.y} r='6' />
    <path d={`M ${center.x}, ${center.y} L ${target.x} ${target.y}`} />
  {/each}
  <foreignObject
    x={center.x - width/2} y={center.y - width/2}
    width={width} height={height}
  >
    <div class='container'>
      <GlowingText {text}
        glowColor='#C7C7C7'
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
    color: #1e88a8;
    font-style: italic;
    
  }
  .container > :global(.glowing-text) {
    margin: 1em;
  }
  path {
    fill: none;
    stroke: #1e88a8;
    stroke-width: 3px;
  }
  circle {
    fill: #1e88a8;
    stroke: none;
  }
</style>