<script context='module' lang='ts'>
  export interface Result {
    name: string,
    nameIsPrimary: boolean,
    primaryName: string,
    intervalSet: IntervalSet,
  }
</script>

<script lang='ts'>
  import {default as computedData} from '../../Data/computedData.json';
  import WithPlural from '../common/WithPlural.svelte';
  import ResultRow from './ResultRow.svelte';
  import { IntervalSet } from '../../Utils/Music/IntervalSet';
  import { getStore } from '../../store';
  import DeleteIcon from '../common/Icons/DeleteIcon.svelte';
  import {modalPanes as modal} from '../Layout/Layout.svelte';

  const {intervalSet} = getStore();
  
  let query = ''; 

  function select(is: IntervalSet) {
    intervalSet.smartUpdate(_ => is);
    modal.Search.close();
  }

  $: searchTerms = query.split(' ').filter(i => i.length > 0);

  $: pool = (() => {
    let items: Result[] = [];
    computedData.scales.forEach(scaleData => { 
      const intervalSet = IntervalSet.fromBinary(scaleData.binary);
      scaleData.names?.forEach((name, index, names) => {
        const primaryName = names[0];
        items.push({
          name,
          nameIsPrimary: name === primaryName,
          primaryName,
          intervalSet,
        });
      });
    });
    return items;
  })();

  $: results = searchTerms.length === 0
    ? pool.filter(result => result.nameIsPrimary)
    : pool.filter(({name}) => 
        searchTerms.every(term => name.search(new RegExp(term, 'i')) !== -1)
      );

  $: countResults = searchTerms.length === 0 ? pool.length : results.length;

</script>

<div class='search enable-touch-action'>
  
  <div class='top'>
    <form>
      <div class='form-row'>
        <label for='form_name'>Name:</label>
        <div class='input'>
          <input id='form_name' type="text" bind:value={query} />
          <div class='delete' role="button" on:click={() => {query = '';}}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </form>
    
    <div class='stats'>
      Found: 
      <WithPlural let:s let:count count={countResults}>
        {count} named scale{s}
      </WithPlural>
    </div>
  </div>
  
  <div class='results'>
    {#each results as result}
      <ResultRow {result} on:click={() => select(result.intervalSet)} />
    {/each}
  </div>
</div>


<style>
  .search {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .top {
    flex-shrink: 0; /* For WebKit bug */
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
