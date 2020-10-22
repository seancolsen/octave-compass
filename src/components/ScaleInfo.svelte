<script lang="ts">
  import {getStore} from '../store';

  const {
    title,
    alternateScaleNames,
    inversionText,
    isNamed,
  } = getStore();

</script>

{#if $isNamed}
  <h3>Scale names:</h3>
  <ul>
    <li>{$title}</li>
    {#each $alternateScaleNames as name}
      <li>{name}</li>
    {/each}
  </ul>
{:else}
  <p><em>This scale is</em></p>
{/if}
