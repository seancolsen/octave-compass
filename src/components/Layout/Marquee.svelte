<script lang="ts">
  import {scaleIsRotating} from "../Wheel/Wheel.svelte";
  import {getStore} from '../../store';
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

{#if !$scaleIsRotating}
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
{/if}

<style>
  .marquee {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #EEE;
    border-radius: 0 0 0.6em 0.6em;
    box-shadow: 0 0 0.6em 0 black;
    border: solid 0.1em white;
  }
  h1 { text-align: center; color: #222; }
  h1.isNamed { font-style: italic; }
  .subtitle {
    box-sizing: border-box;
    text-align: center;
    font-style: italic;
    color: #222;
  }
  .aka { color: #777; }
  .show-more {text-decoration: underline; cursor: pointer;}
</style>