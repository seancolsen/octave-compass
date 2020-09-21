<!--
  @component
  One key within a keyboard.
  
  - This component needs to be placed somewhere within a Keyboard component.
  - If this Key component is inside an SVG, then you need to set the
    isInsideSvg prop to `true` in order for it to be rendered with a `g`
    element instead of a `div`.
  - **Important**: In order to function correctly, this Key component must have
    one and only direct descendant with a class of `touch-receptor` to act as
    the area that receives touches.
    - When in HTML, it's best if that element wraps all the other elements
      necessary to render the key.
    - When in SVG, you *can't* use a `g` element for the `touch-receptor`! This
      is frustrating! See https://stackoverflow.com/q/63985242/895563. So you'll
      need to create a special polygon or something similar and place it *on top
      of* all the other elements and set `visibility: hidden`. 


  HTML usage:

  ```
  <Key pitches={[pitch]}>
    <div class='touch-receptor'>
      <Other />
      <Components />
      <Here />
    </div>
  </Key>
  ```
  
  SVG usage:

  ```
  <Key pitches={[pitch]} isInsideSvg={true}>
    <g>
      <Other />
      <Components />
      <Here />
    </g>
    <polygon points={...} class='touch-receptor' />
  </Key>
  ```
  
-->
<script lang="ts">
  import type {Pitch} from '../../Utils/Music/Pitch';
  import {KeyController} from './KeyController';
  import {audioContext, keyElements} from '../../store';
  import {onMount, afterUpdate, onDestroy} from 'svelte';

  export let pitches: Pitch[];
  export let isInsideSvg = false as boolean;
  export let isActive = true as boolean;
  
  /** 
   * Using `any` because I can't figure out a better way. At first ref is either
   * Element or SVGElement. Then, upon running `afterUpdate()` it gets the
   * keyController property and can be of type `KeyElement`.
   */
  let ref: any;

  onMount(() => keyElements.register(ref));
  onDestroy(() => keyElements.unregister(ref));

  afterUpdate(() => {
    if (!ref) {return}
    if (isActive) {
      /**
       * Onto the calling component's DOM node, attach a reference to the
       * controller so that we can control it once parent components find this
       * element via document.elementFromPoint(). We do this afterUpdate so that
       * if a new KeyController is passed it, we can use that updated one.
       */
      const keyController = new KeyController(audioContext, pitches);
      ref.keyController = keyController;
    }
    else {
      ref.keyController = undefined;
    }
  });

  const handleMouseBegin = (event: Event) => {
    if (!isActive) {return;}
    const e = event as MouseEvent;
    e.preventDefault();
    e.stopPropagation();
    // Validate `buttons` for two reasons:
    // - Don't fire when hovering on `mouseover`.
    // - Don't fire when right-clicking on `mousedown`.
    e.buttons === 1 ? ref.keyController.press() : null
  }

  const handleMouseEnd = (event: Event) => {
    if (!isActive) {return;}
    ref.keyController.release();
  }
</script>

<!--
  The event handlers here only deal with mouse events. Touch events are
  handled within Keyboard.svelte.

  **SEE MORE COMMENTS on the event listeners in Keyboard.svelte for more info**.
-->
{#if isInsideSvg}
  <g
    class:isActive
    bind:this={ref}
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
    class:isActive
    bind:this={ref}
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

<style>
  /**
   * This is to make elementFromPoint() work correctly within Keyboard.svelte.
   * We want elementFromPoint() to return the `.touch-receptor` element.
   */
  div :global(*),
  g :global(*) {
    pointer-events: none;
  }
  g > :global(.touch-receptor),
  div > :global(.touch-receptor) {
    pointer-events: all;
    cursor: pointer;
  }
</style>