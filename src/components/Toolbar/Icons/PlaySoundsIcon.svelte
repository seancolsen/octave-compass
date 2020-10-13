<script lang='ts'>
  import {trumpet} from './paths';
</script>

<svg viewBox='0 0 100 100' >
  <path
    class='trumpet'
    d={trumpet}
    transform='scale(0.9) rotate(-35) translate(-40, 55)'
  />
</svg>

<style>
  .trumpet {
    fill: #333;
    stroke: white;
    stroke-width: 20;
    paint-order: markers stroke fill;
  }
</style>