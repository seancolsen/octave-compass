<script lang='ts'>
  export let centerX: number;
  export let centerY: number;
  export let targetX: number;
  export let targetY: number;
  export let width: number;
  export let height: number;

  $: linePoints = `M ${centerX}, ${centerY} L ${targetX} ${targetY}`;
</script>

<circle cx={targetX} cy={targetY} r='6' />
<path d={linePoints} />
<foreignObject
  x={centerX - width/2} y={centerY - width/2}
  width={width} height={height}
>
  <div class='container'>
    <div class='text'><slot /></div>
  </div>
</foreignObject>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    font-size: 35px;
    line-height: 1em;
    text-align: center;
    color: #329cd0;
    font-style: italic;
    pointer-events: none;
  }
  .text {
    display: inline-block;
    padding: 15px;
    background: #DDD;
  }
  path {
    fill: none;
    stroke: #329cd0;
    stroke-width: 3px;
  }
  circle {
    fill: #329cd0;
    stroke: none;
  }
</style>