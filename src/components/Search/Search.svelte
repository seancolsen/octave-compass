<script context='module' lang='ts'>
  export interface Result {
    name: string,
    intervalSet: IntervalSet,
  }
</script>

<script lang='ts'>
  import {default as data}
    from '../../Data/computed/output/searchableIntervalSetData.json';
  import WithPlural from '../common/WithPlural.svelte';
  import ResultRow from './ResultRow.svelte';
  import { IntervalSet } from '../../Utils/Music/IntervalSet';
  import { Scale } from '../../Utils/Music/Scale';
  import { Chord } from '../../Utils/Music/Chord';
  import { getStore } from '../../store';
  import DeleteIcon from '../common/Icons/DeleteIcon.svelte';
  import {modalPanes as modal} from '../Layout/Layout.svelte';

  const {intervalSet} = getStore();
  
  let query = ''; 

  function select(is: IntervalSet) {
    intervalSet.smartUpdate(_ => is);
    modal.Search.close();
  }

  $: searchTerms = query.split(' ');

  $: pool = Object.entries(data).map(([name, intervalSetBinary]) => ({
    name,
    intervalSet: IntervalSet.fromBinary(intervalSetBinary).analyzed,
  } as Result));

  $: results = pool.filter(({name}) => 
    searchTerms.every(term => name.search(new RegExp(term, 'i')) !== -1)
  );

  $: countResultsMatching = (matcher: (result: Result) => boolean) => (
    new Set(results.filter(r => matcher(r)).map(r => r.intervalSet.binary)).size
  );
  $: countScales = countResultsMatching(r => r.intervalSet.isScale || false);
  $: countChords = countResultsMatching(r => r.intervalSet.isChord || false);

  function focus (el: HTMLElement){
    el.focus();
  }

</script>

<div class='search'>
  
  <div class='top'>
    <form>
      <div class='form-row'>
        <label for='form_name'>Name:</label>
        <div class='input'>
          <input id='form_name' type="text" bind:value={query} use:focus />
          <div class='delete' role="button" on:click={() => {query = '';}}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </form>
    
    <div class='stats'>
      Found: 
      <WithPlural let:s let:count count={countScales}>
        {count} scale{s}
      </WithPlural>
      and
      <WithPlural let:s let:count count={countChords}>
        {count} chord{s}
      </WithPlural>
    </div>
  </div>
  
  <div class='results'>
    {#each results as result (result.name)}
      <ResultRow {result} on:click={() => select(result.intervalSet)} />
    {/each}
  </div>
</div>


<style>
  .top {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0.5em 0;
  }
  .top > * {
    padding: 0.3em 1em;
  }
  .search {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .form-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 -0.5em;
  }
  .form-row > * {
    padding: 0.5em;
  }
  .input {
    position: relative;
    display: inline-block;
  }
  input {
    font-size: inherit;
    font-family: inherit;
    background: white;
    padding: 0.5em 2.7em 0.5em 0.7em;
    width: 10em;
    border: none;
    border-radius: 0.3em;
    box-shadow: 0 0 0.4em 0 #777 inset;
  }
  .delete {
    position: absolute;
    top: calc(50% - 0.8em);
    right: 1.2em;
    height: 1.6em;
    width: 1.6em;
    cursor: pointer;
    display: inline-block;
  }

  .stats {
    font-style: italic;
    flex-grow: 1;
    text-align: right;
  }

  .results {
    overflow-y: auto;
  }
</style>
