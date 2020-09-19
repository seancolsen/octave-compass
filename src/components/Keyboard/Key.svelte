<script lang="ts">
  import type {Pitch} from '../../Utils/Music/Pitch';
  import {KeyController} from './KeyController';
  import {audioContext, keyElements} from '../../store';
  import {onMount, afterUpdate} from 'svelte';
  import type { Readable } from 'svelte/store';

  export let pitches: Pitch[];
  export let isInsideSvg = false;
  
  /** 
   * Using `any` because I can't figure out a better way. At first ref is either
   * Element or SVGElement. Then, upon running `afterUpdate()` it gets the
   * keyController property and can be of type `KeyElement`.
   */
  let ref: any;

  let isPressed: Readable<boolean>;
  
  onMount(() => {
    keyElements.register(ref);
  })
  
  afterUpdate(() => {
    /**
     * Onto the calling component's DOM node, attach a reference to the
     * controller so that we can control it once parent components find this
     * element via document.elementFromPoint(). We do this afterUpdate so that
     * if a new KeyController is passed it, we can use that updated one.
     */
    const keyController = new KeyController(audioContext, pitches);
    ref.keyController = keyController;
    isPressed = keyController.isPressed;
  });

  const handleMouseBegin = (event: Event) => {
    const e = event as MouseEvent;
    e.preventDefault();
    e.stopPropagation();
    // Validate `buttons` for two reasons:
    // - Don't fire when hovering on `mouseover`.
    // - Don't fire when right-clicking on `mousedown`.
    e.buttons === 1 ? ref.keyController?.press() : null
  }

  const handleMouseEnd = (event: Event) => {
    ref.keyController?.release()
  }
</script>

<!--
  The event handlers here only deal with mouse events. Touch events are
  handled within Keyboard.svelte.

  **SEE MORE COMMENTS on the event listeners in Keyboard.svelte for more info**.
-->
{#if isInsideSvg}
  <g
    class='key'
    class:isPressed={$isPressed}
    bind:this={ref}
    {...$$restProps}
    on:mousedown={handleMouseBegin}
    on:mouseover={handleMouseBegin}
    on:contextmenu={() => {}}
    on:mouseup={handleMouseEnd}
    on:mouseout={handleMouseEnd}
    on:mouseleave={handleMouseEnd}
  >
    <slot/>
  </g>
{:else}
  <!--
    Why are these duplicated?
    Because https://github.com/sveltejs/svelte/issues/2324
  -->
  <div
    class='key'
    class:isPressed={$isPressed}
    bind:this={ref}
    {...$$restProps}
    on:mousedown={handleMouseBegin}
    on:mouseover={handleMouseBegin}
    on:contextmenu={() => {}}
    on:mouseup={handleMouseEnd}
    on:mouseout={handleMouseEnd}
    on:mouseleave={handleMouseEnd}
  >
    <slot/>
  </div>
{/if}