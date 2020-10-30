<script lang='ts'>
  import Page from "../Page.svelte";
  import Window from "../Window.svelte";
  import type { PaneController } from "./PaneController";

  export let ctrl: PaneController;
  export let title: string;

  const isOpen = ctrl.isOpen;
</script>

{#if $isOpen}
  <div class='aux-pane'>
    <Window
      on:close={ctrl.close}
      hasPadding={false}
      contentBackground='#EEE'
    >
      <h2 slot="title">{title}</h2>
      <Page>
        <slot />
      </Page>
    </Window>
  </div>
{/if}

<style>
  .aux-pane {
    height: 100%;
  }
</style>