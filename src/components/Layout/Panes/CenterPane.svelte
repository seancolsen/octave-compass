<script lang="ts">
import CenterExtensionSetter from "../CenterExtensionSetter.svelte";

  import Pane from "./Pane.svelte";
  import type { PaneController } from "./PaneController";

  export let ctrl: PaneController;
  export let isExtended = false as boolean;
</script>

<Pane {ctrl}>
  <CenterExtensionSetter {isExtended}>
    <slot />
  </CenterExtensionSetter>
</Pane>
