<script lang="ts">
  import { useLight } from "../Lighting/Light";
  import Key from '../Keyboard/Key.svelte';
  import type {Pitch} from '../../Utils/Music/Pitch';
  import {getStore} from '../../store';
  const {tonalCenter} = getStore();

  export let pitch: Pitch
  
  const light = useLight([`note-${pitch.note.id}`]);
  $: pitchName = `${pitch.note.name?.unicode}<sub>${pitch.spiOctave}</sub>`;
</script>

<div
  class='key'
  class:isPressed={$light === 1}
  class:isBlack={pitch.note.color === 'black'}
  class:isTonalCenter={pitch.note.id === $tonalCenter}
>
  <div class='shadow' />
  <Key pitches={[pitch]}>
    <div class='touch-receptor'>
      <div class='light'>{@html pitchName}</div>
      <div class='pitch-name'>{@html pitchName}</div>
    </div>
  </Key>
</div>

<style>
  .key {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 6vmax;
    height: 50%;
    text-align: center;
    font-size: 2.4vmax;
    margin: 0 0.2vmax;
    position: relative;
  }

  .key.isTonalCenter {height: 70%}

  .key > :global(*),
  .touch-receptor {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 2;
  }

  .shadow {
    position: absolute;
    z-index: 1;
    background: black;
    filter: blur(0.6vmax);
  }

  .key.isPressed .shadow {visibility: hidden;}

  .touch-receptor {
    border: 0.4vmax rgba(0, 0, 0, 0);
    pointer-events: all;
    border-radius: 0 0 0.8vmax 0.8vmax;
    background: white;
  }

  .key.isBlack .touch-receptor {background: black; color: white;}
  
  .key.isPressed :global(*) {z-index: 0;}
  
  .pitch-name, .light {
    display: inline-block;
    margin: 1vmax 0;
    padding: 0 0.7vmax;
    border-radius: 0.7vmax;
  }

  .light {
    position: absolute;
    visibility: hidden;
    filter: blur(0.6vmax);
    background: #fff000;
    color: #fff000;
  }

  .pitch-name {position: relative;} /* To get z stacking on top of .light */
  
  .key.isPressed .light {visibility: visible;}
  
  .key.isPressed.isBlack .pitch-name {color: black;}
</style>