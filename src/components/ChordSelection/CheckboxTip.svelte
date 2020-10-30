<script lang="ts">
  const b = {x: 5.3, y: 7};
  const a = {x: b.x + 2.55, y: 1};
</script>

<div class='checkbox-tip'>
  <div class='text'>
    Display these chords within the circular keyboard and scale editor.
  </div>
  
  <svg viewBox='0 0 10 10' width='10em' height='10em' >
    <circle class='dot' cx={a.x} cy={a.y} r={0.2} />
    <path
      class='line'
      d={`M ${a.x},${a.y} C ${a.x-2.5},${a.y} ${b.x},${b.y-1} ${b.x},${b.y}`}
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
    position: relative;
    pointer-events: none;
    color: #005a75;
    font-style: italic;
    margin-bottom: 0.8em;
  }
  .text {
    width: 13em;
    line-height: 1.1em;
    margin-left: 8.5em;
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