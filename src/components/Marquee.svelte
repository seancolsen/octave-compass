<script lang="ts">
  import {getStore} from '../store';
  const {
    title,
    alternateScaleNames,
    inversionText,
    isNamed,
  } = getStore();

  /**
   * Function to execute when the user clicks the "Show more" link within the
   * list of alternate scale names.
   */
  export let showMore = () => {};

  $: nameCount = $alternateScaleNames.length;

</script>

<div class='marquee'>
  <h1 class:isNamed >
    {$title}
    {#if $inversionText}<em>{$inversionText}</em>{/if}
  </h1>
  
  <div class='subtitle'>
    {#if nameCount > 0}
  
      <span class='aka'>Also know as: </span>
      {$alternateScaleNames[0]}
  
      {#if nameCount > 1}
        <span>, and </span>
        <span class='show-more' on:click|preventDefault={showMore}>
          {nameCount - 1} other name{nameCount > 2 ? 's' : ''}...
        </span>
      {/if}
  
    {/if}
  </div>
</div>

<style>
  .marquee {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { text-align: center; }
  h1.isNamed { font-style: italic; }
  .subtitle {
    /* padding: 0.5em; */
    box-sizing: border-box;
    text-align: center;
    font-size: 85%;
    font-style: italic;
  }
  .aka { color: #333; }
  .show-more {text-decoration: underline; cursor: pointer;}
</style>