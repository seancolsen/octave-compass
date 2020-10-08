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

  let query = ''; 

  $: searchTerms = query.split(' ');

  $: pool = Object.entries(data).map(([name, intervalSetBinary]) => ({
    name,
    intervalSet: IntervalSetFactory.fromBinary(intervalSetBinary),
  } as Result));

  $: results = (() => {
    if (query === '') {
      return pool;
    }
    return pool.filter(({name}) => 
      searchTerms.every(term => name.search(new RegExp(term, 'i')) !== -1)
    );
  })();

  $: countUniqueResultsMatching = (matcher: (result: Result) => boolean) => (
    new Set(results.filter(r => matcher(r))).size
  );

</script>

<h2>Search for Scales &amp; Chords by Name</h2>

<input bind:value={query} />

<div class='stats'>
  Found: 
  <WithPlural let:s let:count
    count={countUniqueResultsMatching(r => r.intervalSet instanceof Scale)}
  >{count} scale{s}</WithPlural>
  and
  <WithPlural let:s let:count
    count={countUniqueResultsMatching(r => r.intervalSet instanceof Chord)}
  >{count} chord{s}</WithPlural>
</div>

<div class='results'>
  {#each results as result (result.name)}
    <ResultRow {result} />
  {/each}
</div>
