<script>
  import Search from "../Search/Search.svelte";
  import { modalPanes as panes } from "./Layout.svelte";
  import ModalPane from "./Panes/ModalPane.svelte";
</script>

<ModalPane ctrl={panes.Search}>
  <span slot='title'>Search Scales &amp; Chords</span>
  <Search />
</ModalPane>
