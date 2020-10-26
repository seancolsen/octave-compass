<script lang="ts">
  const a = {x: 9, y: 1};
  const b = {x: 6.45, y: 5.5};
</script>

<div class='checkbox-tip'>
  <div class='text'>
    Display these chords within the circular keyboard and scale editor.
  </div>
  
  <svg viewBox='0 0 50 50' width='50em' height='50em' >
    <circle class='dot' cx={a.x} cy={a.y} r={0.2} />
    <path
      class='line'
      d={`M ${a.x},${a.y} C ${a.x-2},${a.y} ${b.x},${b.y-1} ${b.x},${b.y}`}
    />
    <path
      class='arrow'
      d='M 0,0.6 L 0.3,0 L -0.3,0 Z'
      transform={`translate(${b.x}, ${b.y-0.1})`}
    />
  </svg>
  
</div>

<style>
  .checkbox-tip {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    color: #005a75;
    font-style: italic;
  }
  .text {
    width: 18em;
    line-height: 1.1em;
    margin-left: 10em;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0
  }
  circle {
    fill: #005a75;
  }
  .line {
    fill: none;
    stroke: #005a75;
    stroke-width: 0.1;
  }
  .arrow {
    fill: #005a75;
    stroke: none;
  }
</style>