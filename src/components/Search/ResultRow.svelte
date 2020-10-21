<script lang='ts'>
  import type {Result} from './Search.svelte';
  import IntervalSetPolygon from "../common/IntervalSetPolygon.svelte";
  import { Scale } from '../../Utils/Music/Scale';
  import { Chord } from '../../Utils/Music/Chord';

  export let result: Result;
  $: intervalSet = result.intervalSet;
  $: name = result.name;
  $: primaryName = intervalSet.displayName
    + (intervalSet instanceof Scale ? ' Scale' : '')
    + (intervalSet instanceof Chord ? ' Chord' : '');
</script>

<div class='result' on:click >
  <svg viewBox='-100 -100 200 200' width='3em' height='3em' >
    <IntervalSetPolygon radius={100} {intervalSet} />
  </svg>
  <div class='matching-name'>{name}</div>
  {#if primaryName !== name}
    <div class='primary-name'>({primaryName})</div>
  {/if}
</div>

<style>
  .result {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: solid #DDD 0.1em;
    cursor: pointer;
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