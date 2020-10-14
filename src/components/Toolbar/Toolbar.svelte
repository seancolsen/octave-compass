<script lang='ts'>
  import { getContext } from "svelte";
  import Button from "./Button.svelte";
  import ChordSelection from "../Modals/ChordSelection/ChordSelection.svelte";
  import Search from "../Modals/Search/Search.svelte";
  import ChooseChordsIcon from "./Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "./Icons/SearchIcon.svelte";
  import Divider from "./Divider.svelte";
  import PlaySoundsIcon from "./Icons/PlaySoundsIcon.svelte";
  import EditScaleIcon from "./Icons/EditScaleIcon.svelte";
  import { getStore } from "../../store";
  import MoreOptionsIcon from "./Icons/MoreOptionsIcon.svelte";
  import type { Readable } from "svelte/store";

  const {editVsPlay} = getStore();
  const {open} = getContext('simple-modal');
  const isVertical = getContext('toolbarIsVertical') as Readable<boolean>;
  const modal = (component: any) => open(component, {}, {styleWindow: {}});
</script>

<div class='toolbar' class:isVertical={$isVertical} >
  <Button
    on:click={() => modal(Search)}
    icon={SearchIcon}
    label='Search Scales'
  />
  <Divider />
  <Button
    on:click={() => {editVsPlay.setWithTransition(0)}}
    icon={EditScaleIcon}
    label='Edit Scale'
    isActive={$editVsPlay === 0}
  />
  <Button
    on:click={() => {editVsPlay.setWithTransition(1)}}
    icon={PlaySoundsIcon}
    label='Play Sounds'
    isActive={$editVsPlay === 1}
  />
  <Divider />
  <Button
    on:click={() => modal(ChordSelection)}
    icon={ChooseChordsIcon}
    label='Choose Chords'
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