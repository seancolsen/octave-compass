<script context='module' lang='ts'>
  export interface Result {
    name: string,
    intervalSet: IntervalSet,
  }
</script>

<script lang='ts'>
  import {default as data}
    from '../../../Data/computed/output/searchableIntervalSetData.json';
  import WithPlural from '../../common/WithPlural.svelte';
  import { IntervalSetFactory } from "../../../Utils/Music/IntervalSetFactory";
  import ResultRow from './ResultRow.svelte';
  import type { IntervalSet } from '../../../Utils/Music/IntervalSet';
  import { Scale } from '../../../Utils/Music/Scale';
  import { Chord } from '../../../Utils/Music/Chord';
  import { getStore } from '../../../store';
  import { getContext } from 'svelte';

  const {intervalSet} = getStore();
  const {close} = getContext('simple-modal');
  
  let query = ''; 

  function select(is: IntervalSet) {
    intervalSet.smartUpdate(_ => is);
    close();
  }

  $: searchTerms = query.split(' ');

  $: pool = Object.entries(data).map(([name, intervalSetBinary]) => ({
    name,
    intervalSet: IntervalSetFactory.fromBinary(intervalSetBinary),
  } as Result));

  $: results = pool.filter(({name}) => 
    searchTerms.every(term => name.search(new RegExp(term, 'i')) !== -1)
  );

  $: countResultsMatching = (matcher: (result: Result) => boolean) => (
    new Set(results.filter(r => matcher(r)).map(r => r.intervalSet.binary)).size
  );
  $: countScales = countResultsMatching(r => r.intervalSet instanceof Scale);
  $: countChords = countResultsMatching(r => r.intervalSet instanceof Chord);

</script>

<h2>Search for Scales &amp; Chords by Name</h2>

<input bind:value={query} />

<div class='stats'>
  Found: 
  <WithPlural let:s let:count count={countScales}>{count} scale{s}</WithPlural>
  and
  <WithPlural let:s let:count count={countChords}>{count} chord{s}</WithPlural>
</div>

<div class='results'>
  {#each results as result (result.name)}
    <ResultRow {result} on:click={() => select(result.intervalSet)} />
  {/each}
</div>
