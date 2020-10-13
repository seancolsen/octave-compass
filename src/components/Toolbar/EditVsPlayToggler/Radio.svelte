<script lang="ts">
  export let isActive: boolean;
</script>

<svg viewBox='-100 -100 200 200' width='100%' height='100%'>
  <circle x='0' y='0' r='100' class='background' />
  <circle x='0' y='0' r='80' class='outline' />
  {#if isActive}
    <circle x='0' y='0' r='40' class='dot' />
  {/if}
</svg>

<style>
  .background {fill: #f2f2f2;}
  .outline {fill: #EEE; stroke: #555; stroke-width: 20;}
  .dot {fill: #333;}
</style>