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
  import Center from "./Center.svelte";
  import { setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import Modals from "./Modals.svelte";

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
    <div id='toolbar'><Toolbar /></div>
    <div id='center'><Center /></div>
  </div>
  <Modals />
</div>

<style>
  :global(body) {background: #AAA;}
  #layout { height: 100%; width: 100%; position: relative}

  /* Set z-index for everything. */
  #grid > * {position: relative;}
  #toolbar { z-index: 2; }
  #center { z-index: 1; }

  /* Specifics */
  #center {overflow: hidden;}
  
  /* ======================================================================= */
  /* Responsive stuff */
  
  #grid { height: 100%; width: 100%; display: flex; }

  /* Begin with tall windows */
  #grid {flex-direction: column;}
  #center { flex-grow: 1;}
  
  /*
  Put the toolbar on the left when the screen gets wider.
  We don't use media queries because we need to also change some other stuff
  in more deeply nested components.
  */
  #grid.windowIsWide { flex-direction: row;}
  #grid.windowIsWide #toolbar { width: 13em; }
  
</style>