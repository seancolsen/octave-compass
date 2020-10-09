<script lang="ts">
  let className = undefined as string | undefined;
  export {className as class};
  export let isActive: boolean;
</script>

<svg viewBox='-100 -100 200 200' class={className} width='1.2em' height='1.2em'>
  <circle x='0' y='0' r='80' class='outline' />
  {#if isActive}
    <circle x='0' y='0' r='40' class='dot' />
  {/if}
</svg>

<style>
  .outline {fill: #EEE; stroke: #555; stroke-width: 20;}
  .dot {fill: #333;}
</style>