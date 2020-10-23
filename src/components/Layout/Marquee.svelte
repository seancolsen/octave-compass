<script lang="ts">
  import {scaleIsRotating} from "../Wheel/Wheel.svelte";
  import {getStore} from '../../store';
  import { modalPanes as modal } from "./Layout.svelte";
import WithPlural from "../common/WithPlural.svelte";

  const { title, intervalSet } = getStore();

  $: alternateNames = $intervalSet.scale?.alternateNames || [];

</script>

<div class='marquee'>
  {#if !$scaleIsRotating}
    <div class='inner'>
      <h1 class:isNamed={$intervalSet.isNamed}>{$title}</h1>
      
      <div class='subtitle'>
        {#if alternateNames.length > 0}
      
          <span class='aka'>Also know as: </span>
          {alternateNames[0]}
      
          {#if alternateNames.length > 1}
            <span>, and </span>
            <span
              class='show-more'
              role='button'
              on:click={modal.ScaleInfo.open}
            >
              <WithPlural count={alternateNames.length - 1} let:count let:s>
                {count} other name{s}...
              </WithPlural>
            </span>
          {/if}
      
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .marquee {
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: -0.2em;
    padding-top: 0.2em;
    line-height: 1.1em;
  }
  .inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #EEE;
    border-radius: 0 0 0.6em 0.6em;
    box-shadow: 0 0 0.6em 0 black;
    border: solid 0.1em white;
    box-sizing: border-box;
    margin: 0 -0.7em;
    padding: 0 2em;
  }
  h1 { text-align: center; color: #222; }
  h1.isNamed { font-style: italic; }
  .subtitle {
    box-sizing: border-box;
    text-align: center;
    font-style: italic;
    color: #222;
    margin-top: 0.8em;
  }
  .aka { color: #777; }
  .show-more {text-decoration: underline; cursor: pointer;}
</style>