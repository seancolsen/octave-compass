<script lang="ts">
  import Key from '../Keyboard/Key.svelte';
  import {pitchSet} from '../../store';
  import type { Pitch } from '../../Utils/Music/Pitch';

  const style = (pitch: Pitch) => ''+
    `background: ${pitch.note.color === 'black' ? 'black' : 'white'};`+
    `color: ${pitch.note.color === 'black' ? 'white' : 'black'};`;
</script>

<div class='keyboard'>
  {#each $pitchSet.pitches as pitch}
    <Key
      pitches={[pitch]}
      style={style(pitch)}
    >
      {pitch.note.name?.unicode}
    </Key>
  {/each}
</div>

<style>
  .keyboard {display: flex; flex-direction: row;}
  .keyboard > :global(.key) {
    background: white;
    border: solid 0.3vmax #999;
    width: 6vmax; height: 6vmax;
    cursor: pointer;
    text-align: center;
    font-size: 3vmax;
    border-radius: 0 0 1vmax 1vmax;
  }
  .keyboard > :global(.key.isBlack) {background: black; color: white;}
  .keyboard > :global(.key.isPressed) { background: burlywood; }
</style>