<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel, {scaleIsRotating} from "./Wheel/Wheel.svelte";
  
  import ChordSelection from './Modals/ChordSelection/ChordSelection.svelte';
  import Search from './Modals/Search/Search.svelte';
  import EditVsPlayToggler from './EditVsPlayToggler/EditVsPlayToggler.svelte';
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';
  import {getStore} from '../store';
  import { getContext } from "svelte";
  import Button from "./common/Button.svelte";
  const {editVsPlay} = getStore();
  const {open} = getContext('simple-modal');
  const modal = (component: any) => open(component, {}, {styleWindow: {}});

</script>

<div id='layout'>

  <div id='toolbar'>
    <Button on:click={() => modal(Search)}>Search Scales</Button>
    <EditVsPlayToggler />
    <Button on:click={() => modal(ChordSelection)}>Choose Chords</Button>
  </div>

  <div id='center'>
    <div id='marquee'>
      {#if !$scaleIsRotating}
        <Marquee showMore={() => {}}/>
      {/if}
    </div>
    <Wheel/>
  </div>

  <div id='footer'>
    <LinearKeyboard />
    <div id='footer-links'>
      <div id='source-code'>Octave Compass</div>
      <div id='app-name'>
        <a target="_blank"
          href='https://github.com/seancolsen/octave-compass'
        >Source code</a>
      </div>
    </div>
  </div>

</div>

<style>
  :global(body),
  #layout {height: 100vh; overflow: hidden; width: 100%; position: fixed;}
  :global(body) { background: #C7C7C7; }

  #layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #toolbar {
    display: flex;
    justify-content: space-between;
    background: #E8E8E8;
    border-bottom: solid 0.2vmax white;
    box-shadow: 0 0 1vmax 0 black;
    font-size: 120%;
    line-height: 95%;
    padding: 0.5em;
    position: relative;
    z-index: 3;
  }

  #center {
    box-shadow: 0 0 2vmax 0 black;
    border-bottom: solid 0.2vmax #E8E8E8;
    flex-grow: 1;
    position: relative;
    z-index: 2;
  }

  #footer {
    background: #999;
    position: relative;
    z-index: 1;
  }
  #footer-links {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    font-size: 80%;
  }
  #footer-links > * {padding: 0.7em 1.5em;}
  #footer-links a {color: black; }
</style>