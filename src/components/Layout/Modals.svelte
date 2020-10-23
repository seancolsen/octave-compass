<script>
  import { getStore } from "../../store";
  import ScaleInfo from "../ScaleInfo.svelte";
  import Search from "../Search/Search.svelte";
  import { modalPanes as panes } from "./Layout.svelte";
  import ModalPane from "./Panes/ModalPane.svelte";
  const {intervalSet} = getStore();
</script>

<ModalPane ctrl={panes.Search} hasPadding={false}>
  <span slot='title'>Search Scales &amp; Chords</span>
  <Search />
</ModalPane>

<ModalPane ctrl={panes.ScaleInfo}>
  <span slot='title'>{$intervalSet.name.full}</span>
  <ScaleInfo />
</ModalPane>
