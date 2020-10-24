<script lang='ts'>
  import { getContext } from "svelte";
  import Button from "./Button.svelte";
  import ChooseChordsIcon from "../common/Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "../common/Icons/SearchIcon.svelte";
  import PlaySoundsIcon from "../common/Icons/PlaySoundsIcon.svelte";
  import EditScaleIcon from "../common/Icons/EditScaleIcon.svelte";
  import { getStore } from "../../store";
  import MoreOptionsIcon from "../common/Icons/MoreOptionsIcon.svelte";
  import type { Readable } from "svelte/store";
  import {centerPanes as center} from '../Layout/Layout.svelte';
  import {modalPanes as modal} from '../Layout/Layout.svelte';
  import Marquee from "../Layout/Marquee.svelte";
  import ScaleInfoIcon from "../common/Icons/ScaleInfoIcon.svelte";
  
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

  <div class='buttons'>
    <div class='group'>
      <Button
        on:click={() => { editVsPlay.setWithTransition(1); center.Wheel.open(); }}
        icon={PlaySoundsIcon} label='Play Sounds' isActive={playButtonIsActive}
      />
      <Button
        on:click={() => {editVsPlay.setWithTransition(0); center.Wheel.open(); }}
        icon={EditScaleIcon} label='Edit Scale' isActive={editButtonIsActive}
      />
      <Button
        on:click={center.ChordSelection.open}
        icon={ChooseChordsIcon} label='Choose Chords' isActive={$chordsIsOpen}
      />
      <Button
        on:click={center.ScaleInfo.open}
        icon={ScaleInfoIcon} label='Scale Info' isActive={$scaleInfoIsOpen}
      />
    </div>
    <div class='group'>
      <Button
        on:click={modal.Search.open}
        icon={SearchIcon}
        label='Search Scales'
      />
      <Button
        on:click={() => {}} 
        label='More Options'
        icon={MoreOptionsIcon}
      />
    </div>
  </div>

</div>

<style>
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

  /* positioning */

  .toolbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 95%;
    padding: 0.5em;
    box-sizing: border-box;
  }
  .toolbar.isVertical {
    height: 100%;
  }

  .marquee {
    padding: 0.2em 0 1em 0;
  }
  .toolbar.isVertical .marquee {
    padding: 0.5em 0 1.5em 0;
    min-height: 4em;
  }

  .buttons {
    flex-grow: 1;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-around;
  }
  .toolbar.isVertical .buttons {
    flex-direction: column;
    justify-content: space-between;
  }

  .group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .buttons :global(.button) {
    width: min-content;
    margin: 0 0.2em;
  }
  .toolbar.isVertical .buttons :global(.button) {
    margin: 1em 0 0 0;
    width: 40%;
  }
</style>