<script lang='ts'>
  import Wheel from "../Wheel/Wheel.svelte";
  import ChordSelection from "../ChordSelection/ChordSelection.svelte";
  import LinearKeyboard from '../LinearKeyboard/LinearKeyboard.svelte';
  import {auxPanes as panes} from './Layout.svelte';
  import ScaleInfo from "../ScaleInfo.svelte";
  import { writable, derived } from "svelte/store";
  import Notation from "../Notation/Notation.svelte";
  import AuxPane from "./Panes/AuxPane.svelte";

  let width = writable(1000);
  let height = writable(1000);
  const isWide = derived([width, height],
    ([w, h]: [number, number]) => w / h > 1.1
  );
</script>

<div
  class="center"
  class:isWide={$isWide}
  class:isTall={!$isWide}
  bind:clientWidth={$width}
  bind:clientHeight={$height}
>

  <div class='wheel'><Wheel /></div>

  <!-- 
    These panes display content that looks best when it's tall and narrow.
    They move around depending on the window shape.
   -->
  <div class='aux aux-tall'>
    <AuxPane ctrl={panes.ChordSelection} title='Chord Table'>
      <ChordSelection />
    </AuxPane>
    <AuxPane ctrl={panes.ScaleInfo} title="Scale Info">
        <ScaleInfo />
    </AuxPane>
  </div>

  <!-- 
    These panes display content that looks best when it's short and wide.
    They always display below the wheel.
   -->
  <div class='aux aux-wide'>
    <AuxPane ctrl={panes.LinearKeyboard} title='Linear Keyboard'>
      <LinearKeyboard />
    </AuxPane>
    <AuxPane ctrl={panes.Notation} title='Staff Notation'>
      <Notation />
    </AuxPane>
  </div>

</div>

<style>

  /* z-index */
  .center {position: relative;}
  .wheel {z-index: 1;}
  .aux {z-index: 2;}


  /* grid layout */
  .center {
    height: 100%;
    display: grid;
    overflow: hidden;
    grid-template:
      "wheel    " minmax(50%, 1fr)
      "aux-tall " auto
      "aux-wide " auto / 100%;
  }
  .center.isWide {
    grid-template:
      "aux-tall  wheel   " minmax(50%, 1fr)
      "aux-wide  aux-wide" auto / auto minmax(45%, 1fr);
  }
  .wheel {grid-area: wheel;}
  .aux-tall {grid-area: aux-tall;}
  .aux-wide {grid-area: aux-wide;}


  /* specific regions */
  .wheel {
    overflow: hidden;
  }
  .aux {
    margin: 0 2em -0.7em 2em;
    min-width: 0;
    min-height: 0;
  }
  .center.isWide .aux-tall {
    margin: 2em 0 2em -0.4em;
  }


  /*
    When panes get placed on the side, make sure they're as narrow as possible.
    But don't worry they won't get ridiculously narrow because Page has a
    min-width;
  */
  .center.isWide .aux-tall :global(.aux-pane) {
    max-width: min-content;
  }

</style>