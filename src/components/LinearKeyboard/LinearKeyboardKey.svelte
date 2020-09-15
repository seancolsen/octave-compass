<!--
  Why is this tiny file its own component?
  Because I couldn't figure out a way to call $isPressed within a template.
-->
<script lang="ts">
  import type { KeyController } from '../../Utils/Keyboard/KeyController';
  import {keyAction} from '../../Utils/Keyboard/actions';
  export let controller: KeyController;
  const isPressed = controller.isPressed;
</script>

<div use:keyAction={controller} class='key' class:isPressed={$isPressed}>
  {controller.pitch.note.name?.unicode}
</div>

<style>
  .key {
    background: grey;
    border: solid 5px white;
    width: 20px; height: 80px;
    cursor: pointer;
  }
  .key.isPressed { background: burlywood; }
</style>