<script lang='ts'>
  import type {Result} from './Search.svelte';
  import IntervalSetPolygon from "../common/IntervalSetPolygon.svelte";
  import { getStore } from '../../store';
  import {modalPanes as modal} from '../Layout/Layout.svelte';

  const {intervalSet} = getStore();
  
  export let result: Result;

  function select() {
    intervalSet.smartUpdate(_ => result.intervalSet);
    modal.Search.close();
  }

</script>

<div class='result-row'>
  <div class='content' on:click={select}>
    <svg viewBox='-100 -100 200 200' width='3em' height='3em' >
      <IntervalSetPolygon radius={100} intervalSet={result.intervalSet} />
    </svg>
    <div class='matching-name'>
      {result.name} Scale
    </div>
    {#if !result.nameIsPrimary}
      <div class='primary-name'>({result.primaryName} Scale)</div>
    {/if}
  </div>
</div>

<style>
  .result-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: solid #DDD 0.1em;
    
    padding: 0 0.6em;
  }
  .content {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .content > * {
    margin: 0.4em;
  }
  .content:hover {
    text-decoration: underline;
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