<script lang='ts'>
  import ChordSelection from "../ChordSelection/ChordSelection.svelte";
  import Wheel from "../Wheel/Wheel.svelte";
  import LinearKeyboard from '../LinearKeyboard/LinearKeyboard.svelte';
  import {centerPanes as panes} from './Layout.svelte';
  import Pane from "./Panes/Pane.svelte";
</script>

<div class='center'>
  <Pane ctrl={panes.Wheel}><Wheel /></Pane>
  <Pane ctrl={panes.ChordSelection}><ChordSelection /></Pane>
  <Pane ctrl={panes.LinearKeyboard}><LinearKeyboard /></Pane>
</div>

<style>
  .center {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
</style>
