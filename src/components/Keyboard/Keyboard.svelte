<!-- 
  @component
  A keyboard that plays sound!

  - Should contain multiple Key components.
  - Is designed with the assumption that the app will only contain *one*
    Keyboard component.
 -->
<script lang="ts">
  import type {KeyElement} from './KeyController';
  import {onMount} from 'svelte';
  import {getStore} from '../../store';
  const {keyElements} = getStore();

  export let isPlayable: boolean;
  
  let ref: Element;

  const pressKeysThatAreTouched = (touches: TouchList) => {
    let touchedKeyElements = [] as KeyElement[];
    let newlyTouchedKeyElements = [] as KeyElement[];
    for (let i = 0; i < touches.length; i++) {
      let {clientX, clientY} = touches[i];
      let touchReceptorElement = document.elementFromPoint(clientX, clientY);
      let keyElement = touchReceptorElement?.parentNode as KeyElement;
      if (keyElement?.keyController) {
        // For all keys that we determine the user is touching, call press()
        // on the keyController. Don't worry about pressing keys that are
        // already pressed because the key controller will ignore it.
        let isNewlyTouched = keyElement.keyController.press();

        // Also, store which key controllers we're touching because later on
        // we want to release all pressed keys that we determine are not
        // currently being touched.
        touchedKeyElements = [...touchedKeyElements, keyElement];

        // Also, we want to know whether we've touched any new ones, so keep
        // track of that too.
        if (isNewlyTouched) {
          newlyTouchedKeyElements = [...newlyTouchedKeyElements, keyElement];
        }
      }
    }
    return {touchedKeyElements, newlyTouchedKeyElements};
  }

  const releaseKeysThatAreNotTouched = (
    touchedKeyElements: KeyElement[],
    doImmediateReset: boolean
  ) => {
    $keyElements
      .filter(keyElement => !touchedKeyElements.includes(keyElement))
      .filter(keyElement => !!keyElement.keyController)
      .map(keyElement => keyElement.keyController)
      .filter(keyController => keyController.state === 'playing')
      .forEach(keyController => {
        if (doImmediateReset) { keyController.reset(); }
        else { keyController.release(); }
      });
  }
  
  const syncKeysWithTouches = (event: Event) => {
    const e = event as TouchEvent;
    if (!isPlayable) {return;}
    e.preventDefault();
    e.stopPropagation();
    const {
      touchedKeyElements,
      newlyTouchedKeyElements
    } = pressKeysThatAreTouched(e.touches);
    const doImmediateReset = newlyTouchedKeyElements.length > 0;
    releaseKeysThatAreNotTouched(touchedKeyElements, doImmediateReset);
  };

  /**
   * In additional to basic click-release of keys, we want to be able to "glide"
   * across the keyboard to do a glissando. We want mouse and touch to function
   * the same. And we want multi-touch. Supporting all these use-cases would
   * have been pretty easy if we had 'touchenter' and 'touchleave' events, or if
   * PointerEvent was more complete. But unfortunately I had to build some much
   * more convoluted stuff instead.
   *
   * ## How event handling works here
   *
   * - Key.svelte listens to mouse events, and it's relatively straightforward
   *   there. That's all we need to do to handle mouse events!
   * - Keyboard.svelte listens to touch events, and it's more complicated. To
   *   summarize, whenever *any* touch events happen, we call
   *   syncKeysWithTouches() which looks at all touches to see which keys are
   *   being touched. Then it basically does a diff against the keys that are
   *   pressed and updates they keys as necessary by pressing newly touched ones
   *   and releasing newly non-touched ones.
   * - This is a pretty weird setup, and it took me a long time to figure out. I
   *   originally though I could do all the event handling within Key.svelte but
   *   alas that was too challenging (impossible?).
   *
   * ## Things that didn't work
   *
   * - Only use pointer events?
   *   - For one thing, FF android doesn't support pointer events and the
   *     polyfill showed performance drawbacks in my testing.
   *   - I couldn't figure out a way within PointerEvent to tell the difference
   *     between a mouse over when hovering and a mouse over when dragging.
   *
   * - Maybe use `on:pointerenter` with `e.pointerType === "touch"` to trigger
   *   `press()` within Key.svelte for touches. And accept the lack of FF
   *   android support for gliding across keys? This was *so close* to working,
   *   but for some reason I couldn't get `pointerenter` and `pointerleave` to
   *   appropriately fire for touch events in Chrome. It worked in FF! But in
   *   Chrome those events would only fire once -- at the beginning and end of
   *   the touch, even if the user moved the finger to other elements. If
   *   there's something I was missing, then we could potentially refactor all
   *   the event handlers into Key.svelte and simplify this mess!
   * 
   * ## Other notes
   * 
   * - We use `{passive: false}` because some browsers will default to true for
   *   certain touch events in order to improve scrolling performance.
   * - We add the event handlers manually (instead of by using directives) so
   *   that we can explicitly get non-passive. We can clean this up once
   *   https://github.com/sveltejs/svelte/issues/2068 is resloved.
   *   
   */
  onMount(() => {
    if (!ref) {return}
    ref.addEventListener('touchstart', syncKeysWithTouches, {passive: false});
    ref.addEventListener('touchmove', syncKeysWithTouches, {passive: false});
    ref.addEventListener('touchend', syncKeysWithTouches, {passive: false});
    ref.addEventListener('touchcancel', syncKeysWithTouches, {passive: false});
  })

</script>

<div bind:this={ref} id=keyboard >
  <slot />
</div>