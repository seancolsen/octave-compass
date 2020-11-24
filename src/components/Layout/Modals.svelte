<script>
  import Faq from "../Faq/Faq.svelte";
  import Search from "../Search/Search.svelte";
  import { modalPanes as panes } from "./Layout.svelte";
import Page from "./Page.svelte";
  import ModalPane from "./Panes/ModalPane.svelte";
</script>

<ModalPane ctrl={panes.Search}>
  <h2 slot='title'>Search Scales</h2>
  <Search />
</ModalPane>

<ModalPane ctrl={panes.Faq}>
  <h2 slot='title'>FAQ</h2>
  <Page><Faq /></Page>
</ModalPane>
