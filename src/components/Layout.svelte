<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel, {scaleIsRotating} from "./Wheel/Wheel.svelte";
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';
  import Toolbar from "./Toolbar/Toolbar.svelte";
</script>

<div id='layout'>

  <div id='toolbar'><Toolbar /></div>

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
    background: #AAA;
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
    margin: 0 6em;
  }

  #center {
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
  }
  #footer > * {padding: 0.7em 1.5em;}
  #footer, #footer a {color: #444; }
</style>