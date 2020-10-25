<script lang='ts'>
  import ChordSelection from "../ChordSelection/ChordSelection.svelte";
  import Wheel from "../Wheel/Wheel.svelte";
  import LinearKeyboard from '../LinearKeyboard/LinearKeyboard.svelte';
  import {centerPanes as panes} from './Layout.svelte';
  import ScaleInfo from "../ScaleInfo.svelte";
  import Pane from "./Panes/Pane.svelte";
import Page from "./Page.svelte";
</script>

<Pane ctrl={panes.Wheel}><Wheel /></Pane>
<Pane ctrl={panes.ChordSelection}><Page><ChordSelection /></Page></Pane>
<Pane ctrl={panes.LinearKeyboard}><LinearKeyboard /></Pane>
<Pane ctrl={panes.ScaleInfo}><Page><ScaleInfo /></Page></Pane>
