<script lang="ts">
  import Layout from "./Layout/Layout.svelte";
  import RouteProcessor from "./RouteProcessor.svelte";
  import { setStoreInContext } from '../store';
  import { Url } from './../Utils/Text/Url';
  import 'array-flat-polyfill';
  
  const {tonalCenter, intervalSet} = Url.parse(window.location.pathname);
  setStoreInContext(tonalCenter, intervalSet);

  // Disable default drag-related behaviors
  document.body.ondrag = () => false;
  document.body.ondragstart = () => false;
  document.body.ondrop = () => false;
  document.body.ondblclick = () => false;
  
</script>

<RouteProcessor/>
<Layout/>
