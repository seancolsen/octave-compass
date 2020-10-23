<script lang='ts'>
  import CloseIcon from '../../common/Icons/CloseIcon.svelte';
  import Pane from "./Pane.svelte";
  import type { PaneController } from "./PaneController";

  export let ctrl: PaneController;

  /**
   * When true (default), the window content will have padding. Use false if you
   * want your content to touch the inner sides of the window.
   */
  export let hasPadding = true as boolean;
</script>

<Pane {ctrl}>
  <div class='modal'>
    <div class='overlay' on:click|capture|stopPropagation={ctrl.close} />
    <div class='window'>
      <div class='title-bar'>
        <h2 class='title'><slot name='title' /></h2>
        <div class='close-button' on:click={ctrl.close}><CloseIcon /></div>
      </div>
      <div class='content' class:hasPadding><slot /></div>
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
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  .window {
    position: relative;
    z-index: 102;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0.7em;
    border-radius: 0.5em;
    background: #DDD;
    overflow: hidden;
    box-shadow: 0 0 2em 0 black;
    display: flex;
    flex-direction: column;
  }
  .title-bar {
    position: relative;
  }
  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 2em;
    height: 2em;
    cursor: pointer;
    padding: 0.2em;
  }
  .title {
    margin: 0.2em 0 0 0;
    padding: 0 3em 0.7em 3em;
    border-bottom: solid #DDD 0.1em;
    text-align: center;
  }
  .content {
    overflow-y: hidden;
    height: 100%;
    background: #F4F4F4;
    box-sizing: border-box;
  }
  .content.hasPadding {
    padding: 1em;
  }
</style>