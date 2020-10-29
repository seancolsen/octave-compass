<script lang="ts" context='module'>
  /**
   * - "portrait": Make the button as tall and narrow.
   * - "landscape": Make the button as short and wide.
   */
  export type ButtonLayout = 'portrait' | 'landscape';
</script>

<script lang='ts'>
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";

  export let label: string;
  export let icon = undefined as any;
  export let isActive: boolean | undefined = undefined;
  export let isActiveStore: Readable<boolean> | undefined = undefined;
  export let layout: ButtonLayout | undefined = undefined;

  const contextualLayout =
    getContext<Readable<ButtonLayout> | undefined>('buttonLayout');
  
  $: computedLayout =  layout ? layout
    : contextualLayout ? $contextualLayout
    : 'portrait';
  
  $: computedIsActive = isActive !== undefined ? isActive
    : isActiveStore ? $isActiveStore
    : false;
  
</script>

<div
  class='button'
  class:isActive={computedIsActive}
  class:isPortrait={computedLayout === 'portrait'}
  class:isLandscape={computedLayout === 'landscape'}
  role="button"
  aria-pressed={computedIsActive ? 'true' : 'false'}
  on:click
>
  {#if icon}<div class='icon'><svelte:component this={icon} /></div>{/if}
  {#if label}<div class='label'>{label}</div>{/if}
</div>

<style>
  .button {
    display: inline-block;
    padding: 0.2em 0.4em;
    cursor: pointer;
    line-height: 1em;
    text-align: center;
    outline: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: solid 0.1em transparent;
  }
  .button.isLandscape {
    flex-direction: row;
    padding: 0.6em 0.4em;
  }
  .button.isLandscape .label {
    text-align: left;
  }
  .button.isActive {
    border-radius: 0.4em;
    background: #f7f7f7;
    border-color: #AAA;
  }
  .button > * {margin: 0.2em;}
  .icon {
    height: 2em;
    width: 2em;
    min-width: 2em;
  }
  .label {
    width: min-content;
    flex-grow: 1;
  }
</style>