<script lang='ts'>
  import ChordSelection from "../ChordSelection/ChordSelection.svelte";
  import Wheel from "../Wheel/Wheel.svelte";
  import LinearKeyboard from '../LinearKeyboard/LinearKeyboard.svelte';
  import {centerPanes as panes} from './Layout.svelte';
  import CenterPane from "./Panes/CenterPane.svelte";
</script>

<div class='center'>
  <CenterPane ctrl={panes.Wheel} isExtended ><Wheel /></CenterPane>
  <CenterPane ctrl={panes.ChordSelection}><ChordSelection /></CenterPane>
  <CenterPane ctrl={panes.LinearKeyboard}><LinearKeyboard /></CenterPane>
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
