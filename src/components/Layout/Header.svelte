<script lang="ts">
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";
  import {getStore} from '../../store';
  import Button from "../Toolbar/Button.svelte";
  import {modalPanes as modal} from '../Layout/Layout.svelte';
  import FaqIcon from "../common/Icons/FaqIcon.svelte";
  import SearchIcon from "../common/Icons/SearchIcon.svelte";

  const { title, intervalSet, scaleIsRotating } = getStore();
  const windowIsWide = getContext('windowIsWide') as Readable<boolean>;
</script>

<div class='header' class:windowIsWide={$windowIsWide}>

  <div class='app-control'>
    <div class='brand'>Octave Compass</div>
    <div class='app-buttons'>
      <Button label='Scale Index' icon={SearchIcon} layout='menu'
        on:click={modal.Search.open} 
      />
      <Button label='FAQ' icon={FaqIcon} layout='menu'
        on:click={modal.Faq.open} 
      />
    </div>
  </div>
  
  <div
    class='marquee'
    class:scaleIsRotating={$scaleIsRotating}
    class:isNamed={$intervalSet.isNamed}
  >
    <h1>{$title}</h1>
  </div>
  
</div>

<style>
  .header {
    background: #DDD;
  }
  .header.windowIsWide {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    background: #EEE;
    border-bottom: solid 0.1em white;
    box-shadow: 0 0 1em 0 black;
    padding: 0.5em;
  }

  .app-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1em;
    border-bottom: solid #BBB 0.1em;
  }
  .header.windowIsWide .app-control {
    flex-direction: column;
    border-bottom: none;
    border-left: solid #BBB 0.1em;
  }
  .brand {
    color: #333;
    font-size: 120%;
  }
  .header.windowIsWide .brand {
    display: none;
  }
  .app-buttons {
    display: flex;
  }
  .header.windowIsWide :global(.button) {
    padding-bottom: 0;
  }
  
  .marquee {
    flex-grow: 1;
    text-align: center;
    color: #222;
    line-height: 1.5em;
    padding: 1em;
  }
  .marquee.scaleIsRotating {
    visibility: hidden;
  }
  .marquee.isNamed {
    font-style: italic;
  }
  .header.windowIsWide .marquee {
    text-align: left;
    padding: 0 1em;
  }

</style>
