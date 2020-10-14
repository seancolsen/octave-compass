<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Toolbar from "../Toolbar/Toolbar.svelte";
  import Footer from "./Footer.svelte";
  import Center from "./Center.svelte";
</script>

<div id='layout'>
  <div id='toolbar'><Toolbar /></div>
  <div id='marquee'><Marquee /></div>
  <div id='center'><Center /></div>
  <div id='footer'><Footer /></div>
</div>

<style>
  :global(body) { background: #AAA; }

  #layout {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template: auto 6em 1fr 3em / auto 1fr;
  }

  #toolbar {grid-row: 1; grid-column: 1 / span 2;}
  #marquee {grid-row: 2; grid-column: 1 / span 2;}
  #center {grid-row: 2 / span 3; grid-column: 1 / span 2;}
  #footer {grid-row: 4; grid-column: 1 / span 2;}

  #layout > * {position: relative;} /* For z-index */
  #toolbar { z-index: 3; }
  #marquee { z-index: 2; }
  #center { z-index: 0; }
  #footer { z-index: 1; }

  #center {
    height: 100%;
    overflow: hidden;
  }

  #marquee { margin: 0 6em; }
</style>