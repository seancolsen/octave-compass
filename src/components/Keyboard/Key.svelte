<script context="module" lang="ts">
  import {writable, get, derived} from 'svelte/store';
  import SynthNote from './SynthNote';
  
  /**
   * Each Key component gets a corresponding KeyController instance to control
   * it. The KeyController instance gets passed into the Key component and the
   * Key component reads controller values like `isPressed` to determine how to
   * render. The KeyController is responsible for playing sound through a
   * SynthNote which it creates when needed. With this setup, both the Key
   * component and components above the Key component can control the pressing
   * and releasing of keys. Calling press() and release() on the controller
   * is sufficient to both (a) play sound, and (b) give visual cues within the
   * Key component that sound is playing.
   * 
   */
  export class KeyController {

    audioContext: AudioContext;

    /**
     * The frequency (in hertz) of the note that they key should play when
     * pressed.
     */
    freq: number;

    /**
     * When null, this indicates that the key is not currently being pressed.
     * When set to a function this indicates that they key is currently being
     * pressed, AND gives us a method to release the synth upon release of the
     * key.
     */
    doReleaseSynth = writable(null as null | (() => void));
    
    constructor(audioContext: AudioContext, freq: number) {
      this.audioContext = audioContext;
      this.freq = freq;
    }

    /**
     * We know a key is pressed when we have a function set for doReleaseSynth.
     */
    get isPressed () {
      return derived(this.doReleaseSynth, $r => !!$r);
    }

    /**
     * Begins playing a SynthNote (sound to speakers!) and also tells the Key
     * component to render a visual indication that sound is playing.
     */
    press() {
      if (get(this.isPressed)) {return;}
      
      // For chrome policy
      // Tutorials recommend running this with `await`, but I had trouble with
      // redundant key presses when making press() an async function.
      this.audioContext.resume();

      const synthNote = new SynthNote(this.audioContext, this.freq);
      synthNote.attack();
      this.doReleaseSynth.set(() => synthNote.release());
    }

    /**
     * Begins the release of the SynthNote -- which will transition the sound
     * gradually to zero. Also changes the visual rendering of the Key
     * component to indicate that sound is no longer playing.
     */
    release() {
      const isPressed = get(this.isPressed);
      if (!isPressed) {return;}
      get(this.doReleaseSynth)();
      this.doReleaseSynth.set(null);
    }

  }

  /**
   * We attach a KeyController to the DOM element so that we'll be able to
   * control this component upon finding the DOM element with
   * document.elementFromPoint(). So here, we difine a type that lets TS see
   * our keyController property for what it is.
   */
  export interface KeyElement extends Element {
    keyController: KeyController;
  }

</script>

<script lang="ts">
  import {onMount} from 'svelte';
  let className = undefined as string | undefined;
  export {className as class};
  export let controller: KeyController;
  const {isPressed} = controller;
  let element: Element;
  onMount(() => {
    // Onto this component's DOM node, attach a reference to the controller so
    // that we can control it once parent components find this element via
    // document.elementFromPoint().
    // @ts-ignore because we're creating this property as we set it
    element.keyController = controller;
  });

  const handleMouseBegin = (e: MouseEvent) => {
    // Validate `buttons` for two reasons:
    // - Don't fire when hovering on `mouseover`.
    // - Don't fire when right-clicking on `mousedown`.
    e.buttons === 1 ? controller.press() : null
  }
</script>

<!--
  The event handlers here only deal with mouse events. Touch events are handled
  in the parent component -- Keyboard.svelte. See the comments above the event
  handlers in Keyboard.svelte for more notes about this setup.
-->
<div
  class={className}
  class:isPressed={$isPressed}
  bind:this={element}
  on:mousedown|preventDefault|stopPropagation={handleMouseBegin}
  on:mouseover|preventDefault|stopPropagation={handleMouseBegin}
  on:contextmenu|preventDefault|stopPropagation={() => {}}
  on:mouseup={e => controller.release()}
  on:mouseout={e => controller.release()}
  on:mouseleave={e => controller.release()}
>
  <slot></slot>
</div>
