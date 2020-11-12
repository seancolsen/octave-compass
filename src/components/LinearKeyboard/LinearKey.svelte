<script lang="ts">
  import { useLight } from "../Lighting/Light";
  import Key from '../Keyboard/Key.svelte';
  import type {Pitch} from '../../Utils/Music/Pitch';
  import {getStore} from '../../store';
  import { OscillatorVoice } from "../Keyboard/Voices/OscillatorVoice";
  import { lightClassesForPitchLight } from "../Lighting/LightClasses";
  const {tonalCenter, createKeyController} = getStore();

  export let pitch: Pitch
  
  const light = useLight(lightClassesForPitchLight(pitch));
  $: pitchName = `${pitch.note.guaranteedName?.unicode}<sub>${pitch.spiOctave}</sub>`;
  $: isTonalCenter = pitch.note.id === $tonalCenter;
  $: keyController = createKeyController({
    pitches: [pitch],
    createVoice: audioContext => new OscillatorVoice({audioContext}),
  })
  
</script>

<div
  class='linear-key'
  class:isPressed={$light === 1}
  class:isBlack={pitch.note.color === 'black'}
  class:isTonalCenter
>
  <Key controller={keyController} >
    <!--
      Why not use css box-shadow? Because those shadows would cover adjacent
      keys.
    -->
    <div class='render'>
      <div class='shadow' />
      <div class='background'>
        <div class='light'>{@html pitchName}</div>
        <div class='pitch-name'>{@html pitchName}</div>
      </div>
    </div>
    <div class='touch-receptor' />
  </Key>
  {#if isTonalCenter}
    <div class='tip'>tonal ctr.</div>
  {/if}
</div>

<style>
  div {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .linear-key {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 4em;
    height: 50%;
    text-align: center;
    margin: 0;
    position: relative;
  }

  .linear-key.isTonalCenter {height: 70%;}

  .linear-key > :global(.key) {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .render {
    height: 100%;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 0 0.15em; /* see .shadow when changing */
  }

  .touch-receptor {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .shadow {
    width: calc(100% - 0.3em); /* twice .render padding */
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    border-radius: 0 0 0.5em 0.5em;
    filter: blur(0.4em);
  }

  .linear-key.isPressed .shadow {visibility: hidden;}

  .background {
    height: 100%;
    width: 100%;
    border-radius: 0 0 0.5em 0.5em;
    background: #EEE;
    position: relative;
  }

  .linear-key.isBlack .background {background: #222; color: white;}
  
  .linear-key.isPressed :global(*) {z-index: 0;}/* below the shadows of others*/
  .shadow {z-index: 1;}
  .background {z-index: 3;}
  .touch-receptor {z-index: 4;}
  
  
  .pitch-name, .light {
    display: inline-block;
    margin: 0.6em 0;
    padding: 0 0.2em;
    border-radius: 0.2em;
  }

  .light {
    position: absolute;
    visibility: hidden;
    filter: blur(0.2em);
    background: #fff000;
    color: #fff000;
  }

  .pitch-name {position: relative;} /* To get z stacking on top of .light */
  
  .linear-key.isPressed .light {visibility: visible;}
  
  .linear-key.isPressed.isBlack .pitch-name {color: black;}

  .tip {
    position: absolute;
    font-size: 90%;
    width: 100%;
    text-align: center;
    line-height: 1em;
    bottom: -1.5em;
    color: #005a75;
    left: 0;
    pointer-events: none;
  }
</style>