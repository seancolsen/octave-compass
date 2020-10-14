<script lang="ts">
  import Modal from 'svelte-simple-modal';
  import Layout from "./Layout/Layout.svelte";
  import RouteProcessor from "./RouteProcessor.svelte";
  import { setStoreInContext } from '../store';
  import { Url } from './../Utils/Text/Url';
  const {tonalCenter, intervalSet} = Url.parse(window.location.pathname);
  setStoreInContext(tonalCenter, intervalSet);
</script>

<RouteProcessor/>
<Modal>
  <Layout/>
</Modal>
