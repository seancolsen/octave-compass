<script lang="ts">
  import Key from '../Keyboard/Key.svelte';
  import {pitchSet} from '../../store';
</script>

<div class='keyboard'>
  {#each $pitchSet.pitches as pitch}
    <Key pitches={[pitch]}>
      <div class='key' class:isBlack={pitch.note.color === 'black'} >
        {pitch.note.name?.unicode}
      </div>
    </Key>
  {/each}
</div>

<style>
  .keyboard {display: flex; flex-direction: row;}
  .key {
    background: white;
    border: solid 0.3vmax #999;
    width: 6vmax; height: 6vmax;
    cursor: pointer;
    text-align: center;
    font-size: 3vmax;
    border-radius: 0 0 1vmax 1vmax;
  }
  .key.isBlack {background: black; color: white;}
</style>