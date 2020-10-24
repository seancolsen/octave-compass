<script lang="ts" context='module'>
  import { PaneAreaController } from './Panes/PaneAreaController';

  const center = new PaneAreaController({canBeEmpty: false});
  export const centerPanes = {
    Wheel: center.addPane({isInitiallyOpen: true}),
    LinearKeyboard: center.addPane(),
    ChordSelection: center.addPane(),
  };

  const modal = new PaneAreaController({canBeEmpty: true});
  export const modalPanes = {
    Search: modal.addPane(),
    Options: modal.addPane(),
    ScaleInfo: modal.addPane(),
  };
</script>

<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Toolbar from "../Toolbar/Toolbar.svelte";
  import Footer from "./Footer.svelte";
  import Center from "./Center.svelte";
  import { setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import Modals from "./Modals.svelte";

  let width = writable(1000);
  let height = writable(1000);

  const toolbarIsVertical = derived([width, height],
    ([w, h]: [number, number]) => w / h > 0.9
  );
  setContext('toolbarIsVertical', toolbarIsVertical);
  
  let centerIsExtended = writable(true);
  setContext('centerIsExtended', centerIsExtended);

</script>

<div id='layout'>
  <div
    id='grid'
    class:toolbarIsVertical={$toolbarIsVertical}
    class:centerIsExtended={$centerIsExtended}
    bind:clientWidth={$width}
    bind:clientHeight={$height}
  >
    <div id='toolbar'><Toolbar /></div>
    <div id='marquee'><Marquee /></div>
    <div id='center'><Center /></div>
    <div id='footer'><Footer /></div>
  </div>
  <Modals />
</div>

<style>
  #grid { background: #EEE; }
  #grid.centerIsExtended { background: #AAA; }
  #layout { height: 100%; width: 100%; position: relative}

  /* Set z-index for everything. */
  #grid > * {position: relative;}
  #toolbar { z-index: 3; }
  #marquee { z-index: 2; }
  #center { z-index: 0; }
  #footer { z-index: 1; }

  /* ======================================================================= */
  /* Responsive stuff */
  
  #grid { height: 100%; width: 100%; display: grid; }

  /* Begin with tall windows */
  #grid {grid-template: auto 6em 1fr 3em / 1fr;}
  #toolbar { grid-row: 1 ; grid-column: 1 ; }
  #marquee { grid-row: 2 ; grid-column: 1 ; }
  #center  { grid-row: 3 ; grid-column: 1 ; }
  #footer  { grid-row: 4 ; grid-column: 1 ; }
  #grid.centerIsExtended #center  { grid-row: 2 / span 3 ; grid-column: 1 ; }
  
  /*
  Put the toolbar on the left when the screen gets wider.
  We don't use media queries because we need to also change some other stuff
  in more deeply nested components.
  */
  #grid.toolbarIsVertical {grid-template: 5em 1fr 3em / auto 1fr;}
  #grid.toolbarIsVertical #toolbar { grid-row: 1 / span 3 ; grid-column: 1 ; }
  #grid.toolbarIsVertical #marquee { grid-row: 1          ; grid-column: 2 ; }
  #grid.toolbarIsVertical #center  { grid-row: 2          ; grid-column: 2 ; }
  #grid.toolbarIsVertical #footer  { grid-row: 3          ; grid-column: 2 ; }
  #grid.toolbarIsVertical.centerIsExtended #center  {
    grid-row: 1 / span 3 ; grid-column: 2 ;
  }
  
</style>