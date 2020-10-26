<script lang='ts'>
  import type { PaneController } from "./PaneController";
  export let ctrl: PaneController;
  const isOpen = ctrl.isOpen;
</script>

<div class='persistent-pane' class:isOpen={$isOpen} >
  <slot />
</div>

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  div.isOpen {
    z-index: 1;
  }
</style>