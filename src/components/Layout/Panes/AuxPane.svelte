<script lang='ts'>
  import Window from "../Window.svelte";
  import type { PaneController } from "./PaneController";

  export let ctrl: PaneController;
  export let title: string;

  const isOpen = ctrl.isOpen;
</script>

{#if $isOpen}
  <div class='aux-pane'>
    <Window on:close={ctrl.close} contentBackground='#EEE'>
      <h2 slot="title">{title}</h2>
      <slot />
    </Window>
  </div>
{/if}

<style>
  .aux-pane {
    height: 100%;
  }
</style>