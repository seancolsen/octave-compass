<script lang='ts'>
  import Pane from "./Pane.svelte";
  import type { PaneController } from "./PaneController";

  export let ctrl: PaneController;
  export let title: string;

</script>

<Pane {ctrl}>
  <div class='modal'>
    <div class='overlay' on:click|capture|stopPropagation={ctrl.close} />
    <div class='window'>
      <h2>{title}</h2>
      <div class='content'>
        <slot />
      </div>
    </div>
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
  .window {
    position: relative;
    z-index: 102;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 1em;
    border-radius: 0.5em;
    background: white;
    overflow: hidden;
  }
  .content {
    overflow-y: scroll;
    height: 100%;
  }
</style>