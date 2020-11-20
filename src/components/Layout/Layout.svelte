<script lang="ts" context='module'>
  import { PaneAreaController } from './Panes/PaneAreaController';
  
  const auxCtrl = new PaneAreaController();
  export const auxPanes = {
    ChordSelection: auxCtrl.addPane(),
    ScaleInfo: auxCtrl.addPane(),
    LinearKeyboard: auxCtrl.addPane(),
    Notation: auxCtrl.addPane(),
  };

  const modal = new PaneAreaController();
  export const modalPanes = {
    Search: modal.addPane(),
    Faq: modal.addPane(),
  };
</script>

<script lang="ts">
  import Toolbar from "../Toolbar/Toolbar.svelte";
  import { setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import Modals from "./Modals.svelte";
  import Header from "./Header.svelte";
  import Center from "./Center.svelte";

  let width = writable(1000);
  let height = writable(1000);

  const windowIsWide = derived([width, height],
    ([w, h]: [number, number]) => w / h > 1
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
    <div id='header'><Header /></div>
    <div id='toolbar'><Toolbar /></div>
    <div id='center'><Center /></div>
  </div>
  <Modals />
</div>

<style>
  :global(body) {
    background: #AAA;
  }
  #layout { height: 100%; width: 100%; position: relative; }

  /* Set z-index for everything. */
  #grid > * {position: relative;}
  #header  { z-index: 3; }
  #toolbar { z-index: 2; }
  #center  { z-index: 1; }
  
  /* ======================================================================= */
  /* Tall windows */
  
  #grid {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template: auto auto 1fr / 100%;
    overflow: hidden;
  }
  #header  { grid-row: 1; grid-column: 1;}
  #toolbar { grid-row: 2; grid-column: 1;}
  #center  { grid-row: 3; grid-column: 1;}

  #center {overflow: hidden;}
  #toolbar {overflow: hidden;}

  /* ======================================================================= */
  /* wide windows */

  /*
  Put the toolbar on the left when the screen gets wider.
  We don't use media queries because we need to also change some other stuff
  in more deeply nested components.
  */
  #grid.windowIsWide { grid-template: auto 1fr / auto 1fr;}
  #grid.windowIsWide #header  { grid-row: 1; grid-column: 1 / span 2; }
  #grid.windowIsWide #toolbar { grid-row: 2; grid-column: 1; }
  #grid.windowIsWide #center  { grid-row: 2; grid-column: 2; }
  
</style>