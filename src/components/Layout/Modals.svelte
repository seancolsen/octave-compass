<script>
  import Search from "../Search/Search.svelte";
  import { modalPanes as panes } from "./Layout.svelte";
  import ModalPane from "./Panes/ModalPane.svelte";
</script>

<ModalPane ctrl={panes.Search} hasPadding={false}>
  <h2 slot='title'>Search Scales &amp; Chords</h2>
  <Search />
</ModalPane>
