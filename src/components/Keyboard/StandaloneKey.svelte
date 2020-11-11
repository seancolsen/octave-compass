<script lang="ts">
  import type {KeyController} from './KeyController';
  import {createEventDispatcher} from 'svelte';

  export let controller: KeyController;
  export let isActive = true as boolean;

  const dispatch = createEventDispatcher();

  const press = (e: Event) => {
    if (!isActive) {return;}
    e.preventDefault();
    e.stopPropagation();
    controller.press();
    dispatch('press');
  }

  const release = (e: Event) => {
    if (!isActive) {return;}
    e.preventDefault();
    e.stopPropagation();
    controller.release();
    dispatch('release');
  }
</script>

<g
  class='standalone-key'
  class:isActive
  on:mousedown={press}
  on:touchstart|nonpassive={press}
  on:contextmenu|preventDefault|stopPropagation={() => {}}
  on:mouseup={release}
  on:mouseout={release}
  on:mouseleave={release}
  on:touchend|nonpassive={release}
  on:touchcancel|nonpassive={release}
>
  <slot/>
</g>

<style>
  .standalone-key.isActive {
    cursor: pointer;
  }
</style>