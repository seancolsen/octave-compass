<script lang="ts">
  import type { PaneController } from "./PaneController";
  export let ctrl: PaneController;
  const isOpen = ctrl.isOpen;
</script>

{#if ctrl.isPersistent || $isOpen}
  <slot {ctrl} />
{/if}
