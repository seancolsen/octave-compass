<script lang="ts">
  import type {Pitch} from '../../Utils/Music/Pitch';
  import {KeyController} from './KeyController';
  import {createEventDispatcher} from 'svelte';
  import {getStore} from '../../store';
  import type { Voice } from './Voices/Voice';
  import { OscillatorVoice } from './Voices/OscillatorVoice';

  const dispatch = createEventDispatcher();
  const {audioContext, lightingController, notesPlaying} = getStore();

  export let pitches: Pitch[];
  export let isActive = true as boolean;
  export let voice: Voice = new OscillatorVoice({
    audioContext,
    type: "triangle"
  });

  $: keyController = new KeyController({
    voice,
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
  class='standalone-key'
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
  .standalone-key.isActive {
    cursor: pointer;
  }
</style>