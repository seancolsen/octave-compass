<script lang='ts'>
  import ChordSelection from "../ChordSelection/ChordSelection.svelte";
  import Wheel from "../Wheel/Wheel.svelte";
  import LinearKeyboard from '../LinearKeyboard/LinearKeyboard.svelte';
  import {centerPanes as panes} from './Layout.svelte';
  import ScaleInfo from "../ScaleInfo.svelte";
  import Page from "./Page.svelte";
  import PersistentPane from "./Panes/PersistentPane.svelte";
</script>

<PersistentPane ctrl={panes.Wheel}>
  <Wheel />
</PersistentPane>

<PersistentPane ctrl={panes.LinearKeyboard}>
  <LinearKeyboard />
</PersistentPane>

<PersistentPane ctrl={panes.ChordSelection}>
  <Page><ChordSelection /></Page>
</PersistentPane>

<PersistentPane ctrl={panes.ScaleInfo}>
  <Page><ScaleInfo /></Page>
</PersistentPane>

