<script lang="ts">
  import type { PaneController } from "./PaneController";
  export let ctrl: PaneController;
  const isOpen = ctrl.isOpen;
</script>

{#if $isOpen}
  <slot {ctrl} {isOpen} />
{/if}
