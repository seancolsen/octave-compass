<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel, {scaleIsRotating} from "./Wheel/Wheel.svelte";
  import Keyboard from './Keyboard/Keyboard.svelte';
  import ChordSelection from './Modals/ChordSelection/ChordSelection.svelte';
  import Search from './Modals/Search/Search.svelte';
  import EditVsPlayToggler from './EditVsPlayToggler/EditVsPlayToggler.svelte';
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';
  import {getStore} from '../store';
  import { getContext } from "svelte";
  import Button from "./common/Button.svelte";
  const {editVsPlay} = getStore();
  const {open} = getContext('simple-modal');
</script>

<div id='layout'>

  <div id='toolbar'>
    <EditVsPlayToggler />
    <Button on:click={() => open(Search)}>Search Scales</Button>
    <Button on:click={() => open(ChordSelection)}>Choose Chords</Button>
  </div>
  
  <div id='marquee'>
    {#if !$scaleIsRotating}
      <Marquee showMore={() => {}}/>
    {/if}
  </div>

  <Keyboard isPlayable={$editVsPlay === 1}>
    <Wheel/>
    <LinearKeyboard />
  </Keyboard>

</div>

<style>
  :global(body),
  #layout {height: 100vh; overflow: hidden; width: 100%; position: fixed;}
  :global(body) { background: #DDD; }

  #toolbar {
    display: flex;
  }

  #toolbar > :global(.edit-vs-play-togger) {
    height: 12vmax;
    width: 12vmax;
  }
</style>