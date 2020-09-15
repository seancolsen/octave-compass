<script lang="ts">
  import {
    title,
    alternateScaleNames,
    inversionText,
    isNamed,
  } from '../store';

  let className = undefined as string | undefined;
  export {className as class};

  /**
   * Function to execute when the user clicks the "Show more" link within the
   * list of alternate scale names.
   */
  export let showMore = () => {};

  $: nameCount = $alternateScaleNames.length;

</script>

<div class={className} id='marquee'>

  <h1 class:isNamed >
    {$title}
    {#if $inversionText}<em>{$inversionText}</em>{/if}
  </h1>

  {#if nameCount > 0}
    <div class='subtitle'>

      <span class='aka'>Also know as: </span>
      {$alternateScaleNames[0]}

      {#if nameCount > 1}
        <span>, and </span>
        <span class='show-more' on:click|preventDefault={showMore}>
          {nameCount - 1} other name{nameCount > 2 && 's'}...
        </span>
      {/if}

    </div>
  {/if}

</div>

<style>
  h1 { text-align: center; }
  h1.isNamed { font-style: italic; }
  .subtitle {
    text-align: center;
    padding: 1vmax;
    font-size: 85%;
    font-style: italic;
    height: 1em;
  }
  .aka { color: #333; }
  .show-more {text-decoration: underline; cursor: pointer;}
</style>