<script lang='ts'>
  import type {Result} from './Search.svelte';
  import IntervalSetPolygon from "../common/IntervalSetPolygon.svelte";

  export let result: Result;
</script>

<div class='result' on:click >
  <svg viewBox='-100 -100 200 200' width='3em' height='3em' >
    <IntervalSetPolygon radius={100} intervalSet={result.intervalSet} />
  </svg>
  <div class='matching-name'>{result.name} Scale</div>
  {#if !result.nameIsPrimary}
    <div class='primary-name'>({result.primaryName} Scale)</div>
  {/if}
</div>

<style>
  .result {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: solid #DDD 0.1em;
    cursor: pointer;
    padding: 0 0.6em;
  }
  .result:hover {
    background: #EEE;
    text-decoration: underline;
  }
  .result > * {
    margin: 0.4em;
  }
  svg :global(polygon) {
    fill: #AAA;
    stroke: none;
  }
  .primary-name {
    font-style: italic;
    color: #666;
  }
</style>