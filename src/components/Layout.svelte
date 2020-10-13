<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel, {scaleIsRotating} from "./Wheel/Wheel.svelte";
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';

  import { getContext } from "svelte";
  import Button from "./Toolbar/Button.svelte";
  import EditVsPlayToggler from "./Toolbar/EditVsPlayToggler/EditVsPlayToggler.svelte";
  import ChordSelection from "./Modals/ChordSelection/ChordSelection.svelte";
  import Search from "./Modals/Search/Search.svelte";
  import ChooseChordsIcon from "./Toolbar/Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "./Toolbar/Icons/SearchIcon.svelte";

  const {open} = getContext('simple-modal');
  const modal = (component: any) => open(component, {}, {styleWindow: {}});
</script>

<div id='layout'>

  <div id='toolbar'>
    <Button on:click={() => modal(Search)} icon={SearchIcon}>
      Search Scales
    </Button>
    <EditVsPlayToggler />
    <Button on:click={() => modal(ChordSelection)} icon={ChooseChordsIcon}>
      Choose Chords
    </Button>
    <Button on:click={() => {}} >
      Options
    </Button>
  </div>
    

  <div id='marquee'>{#if !$scaleIsRotating}<Marquee />{/if}</div>


  <div id='center'>
    <div id='wheel'><Wheel/></div>
    <!-- <LinearKeyboard /> -->
  </div>


  <div id='footer'>
    <div id='source-code'>Octave Compass</div>
    <div id='app-name'>
      <a target="_blank"
        href='https://github.com/seancolsen/octave-compass'
      >Source code</a>
    </div>
  </div>

</div>

<style>
  :global(body) {
    background: #BBB;
  }

  #layout {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template: auto 6em 1fr auto / auto 1fr;
  }

  #toolbar {grid-row: 1; grid-column: 1 / span 2;}
  #marquee {grid-row: 2; grid-column: 1 / span 2;}
  #center {grid-row: 3; grid-column: 1 / span 2;}
  #footer {grid-row: 4; grid-column: 1 / span 2;}

  #toolbar {
    display: flex;
    justify-content: space-between;
    background: #DDD;
    border-bottom: solid 0.1em white;
    line-height: 95%;
    padding: 0.5em;
    position: relative;
    z-index: 3;
    box-shadow: 0 0 0.6em 0 black;
  }

  #marquee {
    box-sizing: border-box;
    margin: 0 6em;
    background: #DDD;
    border-radius: 0 0 0.6em 0.6em;
    box-shadow: 0 0 0.6em 0 black;
    border: solid 0.1em white;
  }

  #center {
    /* box-shadow: 0 0 0.6em 0 black inset; */
    /* border-bottom: solid 0.1em #E8E8E8; */
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  /* #center-content {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  } */


  #wheel {
    /* width: 120%;
    margin-left: -10%;
    margin-top: -10%;
    margin-bottom: -10%; */
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #footer {
    /* background: #E8E8E8; */
    display: flex;
    justify-content: space-between;
    font-size: 80%;
  }
  #footer > * {padding: 0.7em 1.5em;}
  #footer a {color: black; }
</style>