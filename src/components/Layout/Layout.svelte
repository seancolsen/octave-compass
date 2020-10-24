<script lang="ts" context='module'>
  import { PaneAreaController } from './Panes/PaneAreaController';

  const center = new PaneAreaController({canBeEmpty: false});
  export const centerPanes = {
    Wheel: center.addPane({isInitiallyOpen: true}),
    LinearKeyboard: center.addPane(),
    ChordSelection: center.addPane(),
    ScaleInfo: center.addPane(),
  };

  const modal = new PaneAreaController({canBeEmpty: true});
  export const modalPanes = {
    Search: modal.addPane(),
    Options: modal.addPane(),
  };
</script>

<script lang="ts">
  import Toolbar from "../Toolbar/Toolbar.svelte";
  import Footer from "./Footer.svelte";
  import Center from "./Center.svelte";
  import { setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import Modals from "./Modals.svelte";

  let width = writable(1000);
  let height = writable(1000);

  const windowIsWide = derived([width, height],
    ([w, h]: [number, number]) => w / h > 1.25
  );
  setContext('windowIsWide', windowIsWide);
  
</script>

<div id='layout'>
  <div
    id='grid'
    class:windowIsWide={$windowIsWide}
    bind:clientWidth={$width}
    bind:clientHeight={$height}
  >
    <div id='toolbar'><Toolbar /></div>
    <div id='center'><Center /></div>
    <div id='footer'><Footer /></div>
  </div>
  <Modals />
</div>

<style>
  :global(body) {background: #AAA;}
  #layout { height: 100%; width: 100%; position: relative}

  /* Set z-index for everything. */
  #grid > * {position: relative;}
  #toolbar { z-index: 2; }
  #center { z-index: 0; }
  #footer { z-index: 1; }

  /* Specifics */
  #center {overflow: hidden;}
  
  /* ======================================================================= */
  /* Responsive stuff */
  
  #grid { height: 100%; width: 100%; display: grid; }

  /* Begin with tall windows */
  #grid {grid-template: auto 1fr auto / 1fr;}
  #toolbar { grid-row: 1          ; grid-column: 1 ; }
  #center  { grid-row: 2 / span 2 ; grid-column: 1 ; }
  #footer  { grid-row: 3          ; grid-column: 1 ; }
  
  /*
  Put the toolbar on the left when the screen gets wider.
  We don't use media queries because we need to also change some other stuff
  in more deeply nested components.
  */
  #grid.windowIsWide {grid-template: 1fr auto / 13em 1fr;}
  #grid.windowIsWide #toolbar { grid-row: 1 / span 2 ; grid-column: 1 ; }
  #grid.windowIsWide #center  { grid-row: 1 / span 2 ; grid-column: 2 ; }
  #grid.windowIsWide #footer  { grid-row: 2          ; grid-column: 2 ; }
  
</style>