<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel, {scaleIsRotating} from "./Wheel/Wheel.svelte";
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';
  import Toolbar from "./Toolbar/Toolbar.svelte";
</script>

<div id='layout'>

  <div id='toolbar'><Toolbar /></div>

  <div id='center'>
    <div id='center-content'>
      <div id='marquee'>{#if !$scaleIsRotating}<Marquee />{/if}</div>
      <div id='wheel'><Wheel/></div>
    </div>
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
  #layout {height: 100%; width: 100%; overflow: hidden;}
  :global(body) {
    background: #C7C7C7;
    overscroll-behavior: none; /* Disable pull-down-to-refresh on mobile */
  }

  #layout >  * {box-sizing: border-box; overflow: hidden;}

  #toolbar {
    display: flex;
    justify-content: space-between;
    background: #E8E8E8;
    border-bottom: solid 0.1em white;
    box-shadow: 0 0 0.6em 0 black;
    line-height: 95%;
    padding: 0.5em;
    position: relative;
    z-index: 3;
  }

  #center {
    box-shadow: 0 0 1em 0 black;
    border-bottom: solid 0.1em #E8E8E8;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  #center-content {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  #marquee {
    height: 5em;
    overflow: hidden;
  }

  #wheel {
    width: 120%;
    max-height: calc(120% - 5em); /* #marquee height */
    margin-left: -10%;
    margin-top: -10%;
    margin-bottom: -10%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #footer {
    background: #AAA;
    position: relative;
    z-index: 1;
    height: 7em;
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