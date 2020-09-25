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
  class:lightIsOn={$light === 1}
  class:isBlack={pitch.note.color === 'black'}
  class:isTonalCenter={pitch.note.id === $tonalCenter}
>
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
    cursor: pointer;
    text-align: center;
    font-size: 2.4vmax;
    margin: 0 0.2vmax;
  }
  .key.isTonalCenter {height: 70%}
  .key > :global(*),
  .key .touch-receptor {height: 100%; width: 100%; position: relative;}
  .key .touch-receptor {
    border-radius: 0 0 1vmax 1vmax;
    background: white;
    box-shadow: 0px 0px 2vmax 0px black;
  }
  .key.isBlack .touch-receptor {background: black; color: white;}
  .key.lightIsOn .touch-receptor {box-shadow: none;}
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
  .key.lightIsOn .light {visibility: visible;}
  .key.lightIsOn.isBlack .pitch-name {color: black;}
</style>