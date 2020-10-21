<script lang='ts'>
  import { getContext } from "svelte";
  import Button from "./Button.svelte";
  import ChooseChordsIcon from "./Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "./Icons/SearchIcon.svelte";
  import Divider from "./Divider.svelte";
  import PlaySoundsIcon from "./Icons/PlaySoundsIcon.svelte";
  import EditScaleIcon from "./Icons/EditScaleIcon.svelte";
  import { getStore } from "../../store";
  import MoreOptionsIcon from "./Icons/MoreOptionsIcon.svelte";
  import type { Readable } from "svelte/store";
  import {centerPanes as center} from '../Layout/Layout.svelte';
  import {modalPanes as modal} from '../Layout/Layout.svelte';
  import ScaleInfoIcon from "./Icons/ScaleInfoIcon.svelte";
import Search from "../Modals/Search/Search.svelte";
  
  const {editVsPlay} = getStore();
  const isVertical = getContext('toolbarIsVertical') as Readable<boolean>;

  const wheelIsOpen = center.Wheel.isOpen;
  const chordsIsOpen = center.ChordSelection.isOpen;
  const infoIsOpen = center.ScaleInfo.isOpen;
  $: editButtonIsActive = $editVsPlay === 0 && $wheelIsOpen;
  $: playButtonIsActive = $editVsPlay === 1 && $wheelIsOpen;
  
</script>

<div class='toolbar' class:isVertical={$isVertical} >

  <Button
    on:click={() => {
      editVsPlay.setWithTransition(0);
      center.Wheel.open();
    }}
    icon={EditScaleIcon}
    label='Edit Scale'
    isActive={editButtonIsActive}
  />
  <Button
    on:click={() => {
      editVsPlay.setWithTransition(1);
      center.Wheel.open();
    }}
    icon={PlaySoundsIcon}
    label='Play Sounds'
    isActive={playButtonIsActive}
  />
  <Button
    on:click={center.ChordSelection.open}
    icon={ChooseChordsIcon}
    label='Choose Chords'
    isActive={$chordsIsOpen}
  />
  <Button
    on:click={center.ScaleInfo.open}
    icon={ScaleInfoIcon}
    label='Scale Info'
    isActive={$infoIsOpen}
  />
  <Divider />
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

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #DDD;
    border-bottom: solid 0.1em white;
    line-height: 95%;
    padding: 0.5em;
    box-shadow: 0 0 0.6em 0 black;
  }
  .toolbar.isVertical {
    flex-direction: column;
    justify-content: flex-start;
    border-bottom: none;
    border-right: solid 0.1em white;
    height: 100%;
    box-sizing: border-box;
  }
  .toolbar.isVertical > :global(*) {
    margin-bottom: 0.7em;
  }
</style>