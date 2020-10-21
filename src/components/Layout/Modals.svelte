<script>
  import Search from "../Modals/Search/Search.svelte";
  import { modalPanes as panes } from "./Layout.svelte";
  import ModalPane from "./Panes/ModalPane.svelte";
</script>

<ModalPane ctrl={panes.Search}
  title='Search for Scales and Chords'
><Search /></ModalPane>
