<script lang='ts'>
  import type {Result} from './Search.svelte';
  import IntervalSetPolygon from "../../common/IntervalSetPolygon.svelte";

  export let result: Result;
  $: intervalSet = result.intervalSet;
  $: name = result.name;
</script>

<div class='result'>
  <svg viewBox='-100 -100 200 200' width='2em' height='2em' >
    <IntervalSetPolygon radius={100} {intervalSet} />
  </svg>
  <div class='matching-name'>{name}</div>
  {#if intervalSet.displayName !== name}
    <div class='primary-name'>({intervalSet.displayName})</div>
  {/if}
</div>

<style>
  .result {
    display: flex;
    
  }
  svg :global(polygon) {
    fill: #AAA;
    stroke: none;
  }
  .primary-name {
    font-style: italic;
  }
</style>