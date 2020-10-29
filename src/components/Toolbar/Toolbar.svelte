<script lang='ts'>
  import { getContext, setContext } from "svelte";
  import Button from "./Button.svelte";
  import type { ButtonLayout } from "./Button.svelte";
  import ChooseChordsIcon from "../common/Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "../common/Icons/SearchIcon.svelte";
  import EditScaleIcon from "../common/Icons/EditScaleIcon.svelte";
  import { getStore } from "../../store";
  import { derived } from "svelte/store";
  import type { Readable } from "svelte/store";
  import {auxPanes} from '../Layout/Layout.svelte';
  import {modalPanes as modal} from '../Layout/Layout.svelte';
  import ScaleInfoIcon from "../common/Icons/ScaleInfoIcon.svelte";
  import CircularKeyboardIcon from "../common/Icons/CircularKeyboardIcon.svelte";
  import PianoIcon from "../common/Icons/PianoIcon.svelte";
  import NotationIcon from "../common/Icons/NotationIcon.svelte";
  
  const {editVsPlay} = getStore();
  const isVertical = getContext('windowIsWide') as Readable<boolean>;
  setContext<Readable<ButtonLayout>>('buttonLayout',
    derived(isVertical, v => v ? 'landscape' : 'portrait')
  );
  
</script>

<div class='toolbar' class:isVertical={$isVertical} >

  <div class='button-group wheel-buttons'>
    <Button label='Circular Keyboard' icon={CircularKeyboardIcon}
      on:click={() => editVsPlay.setWithTransition(1)} 
      isActive={$editVsPlay === 1}
    />
    <Button label='Scale Editor' icon={EditScaleIcon}
      on:click={() => editVsPlay.setWithTransition(0)}
      isActive={$editVsPlay === 0}
    />
  </div>

  <div class='button-group aux-buttons'>
    <Button label='Chord Table' icon={ChooseChordsIcon}
      on:click={auxPanes.ChordSelection.toggle}
      isActiveStore={auxPanes.ChordSelection.isOpen}
    />
    <Button label='Scale Info' icon={ScaleInfoIcon}
      on:click={auxPanes.ScaleInfo.toggle}
      isActiveStore={auxPanes.ScaleInfo.isOpen}
    />
    <Button label='Staff Notation' icon={NotationIcon}
      on:click={auxPanes.Notation.toggle}
      isActiveStore={auxPanes.Notation.isOpen}
    />
    <Button label='Linear Keyboard' icon={PianoIcon}
      on:click={auxPanes.LinearKeyboard.toggle}
      isActiveStore={auxPanes.LinearKeyboard.isOpen}
    />
  </div>

  <div class='button-group app-buttons'>
    <Button label='Scale Index' icon={SearchIcon}
      on:click={modal.Search.open} 
    />
  </div>

</div>

<style>

  /* top-level toolbar container */
  .toolbar {
    height: 100%;
    padding: 0.5em;
    box-sizing: border-box;
    background: #DDD;
    border-bottom: solid 0.1em white;
    box-shadow: 0 0 1em 0 black;
  }
  .toolbar.isVertical {
    border-bottom: none;
    border-right: solid 0.1em white;
    box-sizing: border-box;
  }


  /* layout button groups within toolbar */
  .toolbar {
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
    overflow-x: auto;
  }
  .toolbar.isVertical {
    flex-direction: column;
  }
  .button-group {
    flex-grow: 1;
  }


  /* layout buttons within group */
  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .toolbar.isVertical .button-group {
    flex-direction: column;
  }
  .button-group :global(.button) {
    margin: 0 0.2em;
  }
  .toolbar.isVertical .button-group :global(.button) {
    margin: 0.2em 0;
    box-sizing: border-box;
    width: 100%;
  }
  

  /* dividers */
  .button-group {
    border-right: solid #888 0.1em;
  }
  .toolbar.isVertical .button-group {
    border-right: none;
    border-bottom: solid #888 0.1em;
  }
  .button-group:last-child {
    border: none !important;
  }

</style>