<script lang="ts">
  const rootCount = 4;
  const radius = 10;
  const strokeWidth = 3;
  const totalRadius = radius + strokeWidth / 2;
  const totalDiameter = totalRadius * 2;
  const spaceBetween = totalDiameter * 0.5;
  const distanceBetweenCenters = totalDiameter + spaceBetween;
  const padding = radius * 0.3;
  const gridSize =
    distanceBetweenCenters * (rootCount - 1) + totalDiameter + padding * 2;
  const origin = 0 - totalRadius - padding;
  const viewBox = `${origin} ${origin} ${gridSize} ${gridSize}`;

  interface Circle {
    x: number,
    y: number,
  }
  let circles = [] as Circle[];
  for (let row of [...Array(rootCount).keys()]) {
    for (let column of [...Array(rootCount).keys()]) {
      circles.push({
        x: row * distanceBetweenCenters,
        y: column * distanceBetweenCenters
      });
    }
  }
</script>

<svg {viewBox} width='100%' height='100%'>
  {#each circles as c}
    <circle class='filled' cx={c.x} cy={c.y} r={radius} stroke-width={strokeWidth} />
  {/each}
</svg>

<style>
  circle {
    stroke: #333;
    fill: none;
  }
  circle.filled {
    fill: #333;
  }
</style>