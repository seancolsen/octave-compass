<script lang="ts">
  import { keyControllers } from '../../store';
  import Key from '../Keyboard/Key.svelte';
</script>

<div class='keyboard'>
  {#each $keyControllers as keyController}
    <Key {keyController} class='key-container'>
      <div class='key' class:isPressed={true}>
        {keyController.pitch.note.name?.unicode}
      </div>
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