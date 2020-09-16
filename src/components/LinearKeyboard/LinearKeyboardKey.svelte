<script lang="ts">
  import type { KeyController } from '../../Utils/Keyboard/KeyController';
  import {keyAction} from '../../Utils/Keyboard/actions';
  export let controller: KeyController;
  const isPressed = controller.isPressed;

  import {afterUpdate} from 'svelte';
  let element: Element;
  afterUpdate(() => keyAction(element, controller));
</script>

<div
  bind:this={element}
  class='key'
  class:isPressed={$isPressed}
  class:isBlack={controller.pitch.note.color === 'black'}
>
  {controller.pitch.note.name?.unicode}
</div>

<style>
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
  .key.isPressed { background: burlywood; }
</style>