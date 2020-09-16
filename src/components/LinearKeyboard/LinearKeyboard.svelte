<script lang="ts">
  import { keyboardAction } from '../../Utils/Keyboard/actions';
  import { keyControllers } from '../../store';
  import LinearKeyboardKey from './LinearKeyboardKey.svelte';
  import {afterUpdate} from 'svelte';
  let element: Element;
  afterUpdate(() => keyboardAction(element, $keyControllers));
</script>

<div class='keyboard' bind:this={element} >
  {#each $keyControllers as controller}
    <LinearKeyboardKey {controller} />
  {/each}
</div>

<style>
  .keyboard {display: flex; flex-direction: row;}
</style>