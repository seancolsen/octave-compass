<script lang='ts'>
  import Window from '../Window.svelte';
  import Pane from "./Pane.svelte";
  import type { PaneController } from "./PaneController";

  export let ctrl: PaneController;
</script>

<Pane {ctrl}>
  <div class='modal'>
    
    <div class='overlay' on:click|capture|stopPropagation={ctrl.close} />

    <Window on:close={ctrl.close}>
      <div slot="title"><slot name="title" /></div>
      <slot />
    </Window>

  </div>
</Pane>

<style>
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
    box-sizing: border-box;
    padding: 2em;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 101;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .modal :global(.window) {
    position: relative;
    z-index: 102;
    height: 100%;
    width: 100%;
  }
</style>