<script lang="ts">
  import type {Pitch} from '../../Utils/Music/Pitch';
  import {KeyController} from './KeyController';
  import {createEventDispatcher} from 'svelte';
  import {getStore} from '../../store';

  const dispatch = createEventDispatcher();
  const {audioContext, lightingController, notesPlaying} = getStore();

  export let pitches: Pitch[];
  export let isActive = true as boolean;

  $: keyController = new KeyController({
    audioContext,
    lightingController,
    pitches,
    notesPlaying
  });

  const press = (e: Event) => {
    if (!isActive) {return;}
    e.preventDefault();
    e.stopPropagation();
    keyController.press();
    dispatch('press');
  }

  const release = (e: Event) => {
    if (!isActive) {return;}
    e.preventDefault();
    e.stopPropagation();
    keyController.release();
    dispatch('release');
  }
</script>

<g
  class='key'
  class:isActive
  on:mousedown={press}
  on:touchstart={press}
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
  /**
   * This is to make elementFromPoint() work correctly within Keyboard.svelte.
   * We want elementFromPoint() to return the `.touch-receptor` element.
   */
  g :global(*) {
    pointer-events: none;
  }
  g.isActive > :global(.touch-receptor) {
    pointer-events: all;
    cursor: pointer;
  }
</style>