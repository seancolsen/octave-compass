<script lang="ts">
  import {getStore} from '../store';
  const { intervalSet } = getStore();

  $: scale = $intervalSet.scale;
  $: invertedChords = $intervalSet.invertedChords;
</script>

{#if scale || (invertedChords && invertedChords.length > 0)}
  <p>The currently selected scale is known by the following names:</p>
{/if}

{#if invertedChords && invertedChords.length > 0 }
  <ul>
    {#each invertedChords as invertedChord}
      <li>{invertedChord.intervalSetName.full}</li>
    {/each}
  </ul>
{/if}

{#if scale}
  <ul>
    {#each scale.names as name}
      <li>{name}</li>
    {/each}
  </ul>
{/if}

{#if !scale && (!invertedChords || invertedChords.length === 0)}
  <p><em>Our data does not inclued any names for the currently selected scale.</em></p>
{/if}
