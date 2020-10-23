<script lang="ts">
  import {getStore} from '../store';
  const { intervalSet } = getStore();

  $: scale = $intervalSet.scale;
  $: invertedChords = $intervalSet.invertedChords;
</script>

{#if invertedChords}
  <h3>Chord names:</h3>
  <ul>
    {#each invertedChords as invertedChord}
      <li>{invertedChord.intervalSetName.full}</li>
    {/each}
  </ul>
{/if}

{#if scale}
  <h3>Scale names:</h3>
  <ul>
    {#each scale.names as name}
      <li>{name}</li>
    {/each}
  </ul>
{/if}

{#if !invertedChords && !scale}
  <h3>Scale names:</h3>
  <p><em>Our data does not inclued any names for this scale.</em></p>
{/if}
