<script lang='ts'>
  import { getContext } from "svelte";
  import Button from "./Button.svelte";
  import ChooseChordsIcon from "../common/Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "../common/Icons/SearchIcon.svelte";
  import EditScaleIcon from "../common/Icons/EditScaleIcon.svelte";
  import { getStore } from "../../store";
  // import MoreOptionsIcon from "../common/Icons/MoreOptionsIcon.svelte";
  import type { Readable } from "svelte/store";
  import {centerPanes as center} from '../Layout/Layout.svelte';
  import {modalPanes as modal} from '../Layout/Layout.svelte';
  import Marquee from "../Layout/Marquee.svelte";
  import ScaleInfoIcon from "../common/Icons/ScaleInfoIcon.svelte";
  import CircularKeyboardIcon from "../common/Icons/CircularKeyboardIcon.svelte";
  
  const {editVsPlay} = getStore();
  const isVertical = getContext('windowIsWide') as Readable<boolean>;

  const wheelIsOpen = center.Wheel.isOpen;
  const chordsIsOpen = center.ChordSelection.isOpen;
  const scaleInfoIsOpen = center.ScaleInfo.isOpen;
  $: editButtonIsActive = $editVsPlay === 0 && $wheelIsOpen;
  $: playButtonIsActive = $editVsPlay === 1 && $wheelIsOpen;
  
</script>

<div class='toolbar' class:isVertical={$isVertical} >

  <div class='marquee'><Marquee /></div>

  <div class='button-group scale-buttons'>
    <Button
      on:click={() => { editVsPlay.setWithTransition(1); center.Wheel.open(); }}
      icon={CircularKeyboardIcon} label='Circular Keyboard' isActive={playButtonIsActive}
    />
    <Button
      on:click={() => {editVsPlay.setWithTransition(0); center.Wheel.open(); }}
      icon={EditScaleIcon} label='Scale Editor' isActive={editButtonIsActive}
    />
    <Button
      on:click={center.ChordSelection.open}
      icon={ChooseChordsIcon} label='Chord Table' isActive={$chordsIsOpen}
    />
    <Button
      on:click={center.ScaleInfo.open}
      icon={ScaleInfoIcon} label='Scale Info' isActive={$scaleInfoIsOpen}
    />
  </div>

  <div class='button-group app-buttons'>
    <Button
      on:click={modal.Search.open}
      icon={SearchIcon}
      label='Scale Index'
    />
    <!-- <Button
      on:click={() => {}} 
      label='More Options'
      icon={MoreOptionsIcon}
    /> -->
  </div>

  <div class='app-info'>
    <div class='brand'>Octave Compass</div>
    <div>
      <a target="_blank"
        href='https://github.com/seancolsen/octave-compass'
      >Source code</a>
    </div>
  </div>

  <div class='divider' />

</div>

<style>
  .toolbar {
    height: 100%;
    padding: 0.5em;
    display: grid;
    grid-gap: 1em;
    grid-template: auto auto / auto auto
  }
  .toolbar.isVertical {
    grid-template: auto 1fr auto auto / auto
  }

  .toolbar .marquee       {grid-row: 1; grid-column: 1;}
  .toolbar .scale-buttons {grid-row: 2; grid-column: 1;}
  .toolbar .app-buttons   {grid-row: 2; grid-column: 2;}
  .toolbar .app-info      {grid-row: 1; grid-column: 2;}

  .toolbar.isVertical .marquee       {grid-row: 1; grid-column: 1;}
  .toolbar.isVertical .scale-buttons {grid-row: 2; grid-column: 1;}
  .toolbar.isVertical .app-buttons   {grid-row: 3; grid-column: 1;}
  .toolbar.isVertical .app-info      {grid-row: 4; grid-column: 1;}


  .app-info {
    text-align: right;
    line-height: 1.1em;
  }
  .toolbar.isVertical .app-info {
    text-align: center;
    padding: 0.5em;
    margin-top: 1em;
  }
  .app-info > *, .app-info a {
    color: #777;
  }

  .marquee {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .toolbar.isVertical .marquee {
    min-height: 6em;
  }

  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .toolbar.isVertical .button-group {
    flex-wrap: wrap;
  }
  .button-group :global(.button) {
    width: min-content;
    margin: 0 0.2em;
  }
  .toolbar.isVertical .button-group :global(.button) {
    margin: 1em 0 0 0;
    box-sizing: border-box;
    width: 50%;
  }
  .scale-buttons {
    align-content: flex-start;
  }

  .divider {
    grid-row: 2;
    grid-column: 2;
    height: 100%;
    border-left: solid #AAA 0.1em;
  }
  .toolbar.isVertical .divider {display: none;}

  /* colors */

  .toolbar {
    background: #DDD;
    border-bottom: solid 0.1em white;
    box-shadow: 0 0 0.6em 0 black;
  }
  .toolbar.isVertical {
    border-bottom: none;
    border-right: solid 0.1em white;
    box-sizing: border-box;
  }
</style>