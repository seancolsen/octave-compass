<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import CloseIcon from "../common/Icons/CloseIcon.svelte";

  const dispatch = createEventDispatcher();

  export let contentBackground: string = '#F4F4F4';

</script>

<div class='window'>
  <div class='title-bar'>
    <div class='title'><slot name='title' /></div>
    <div class='close-button' on:click={() => dispatch('close')}>
      <CloseIcon />
    </div>
  </div>
  <div
    class='content'
    style={`background: ${contentBackground};`}
  >
    <slot />
  </div>
</div>

<style>
  .window {
    height: 100%;
    box-sizing: border-box;
    padding: 0.7em;
    border-radius: 0.5em;
    background: #DDD;
    overflow: hidden;
    box-shadow: 0 0 1em 0 black;
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
    width: 1.5em;
    height: 1.5em;
    cursor: pointer;
    padding: 0.2em;
  }
  .title {
    margin: 0.2em 0 0 0;
    padding: 0 3em 0.3em 3em;
    border-bottom: solid #DDD 0.1em;
    text-align: center;
  }
  .content {
    overflow-y: hidden;
    height: 100%;
    box-sizing: border-box;
  }
</style>