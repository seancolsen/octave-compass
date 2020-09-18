<script lang="ts">
  import type {KeyElement, KeyController } from './KeyController';
  import {afterUpdate} from 'svelte';
  export let keyController: KeyController;
  export let isInsideSvg = false;
  let element: Element | SVGElement;

  afterUpdate(() => {
    /**
     * Onto the calling component's DOM node, attach a reference to the
     * controller so that we can control it once parent components find this
     * element via document.elementFromPoint(). We do this afterUpdate so that
     * if a new KeyController is passed it, we can use that updated one.
     */
    (element as KeyElement).keyController = keyController;
  });

  const handleMouseBegin = (event: Event) => {
    const e = event as MouseEvent;
    e.preventDefault();
    e.stopPropagation();
    // Validate `buttons` for two reasons:
    // - Don't fire when hovering on `mouseover`.
    // - Don't fire when right-clicking on `mousedown`.
    e.buttons === 1 ? keyController.press() : null
  }
</script>

<div>
<!--
  The event handlers here only deal with mouse events. Touch events are
  handled within Keyboard.svelte.

  **SEE MORE COMMENTS on the event listeners in Keyboard.svelte for more info**.
-->
{#if isInsideSvg}
  <g
    bind:this={element}
    {...$$restProps}
    on:mousedown={handleMouseBegin}
    on:mouseover={handleMouseBegin}
    on:contextmenu={() => {}}
    on:mouseup={e => keyController.release()}
    on:mouseout={e => keyController.release()}
    on:mouseleave={e => keyController.release()}
  >
    <slot/>
  </g>
{:else}
  <!--
    Why are these duplicated?
    Because https://github.com/sveltejs/svelte/issues/2324
  -->
  <div
    bind:this={element}
    {...$$restProps}
    on:mousedown={handleMouseBegin}
    on:mouseover={handleMouseBegin}
    on:contextmenu={() => {}}
    on:mouseup={e => keyController.release()}
    on:mouseout={e => keyController.release()}
    on:mouseleave={e => keyController.release()}
  >
    <slot/>
  </div>
{/if}
</div>