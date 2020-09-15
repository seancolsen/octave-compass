import { KeyController } from "./KeyController";
import type {KeyElement} from './KeyController';

/**
 * Add event listeners to make a component behave like a keyboard.
 */
export function keyboardAction(e: Element, keyControllers: KeyController[]) {
  
  const el = e as KeyElement;

  const pressKeysThatAreTouched = (touches: TouchList) => {
    let touchedKeyControllers = [] as KeyController[];
    for (let i = 0; i < touches.length; i++) {
      let {clientX, clientY} = touches[i];
      let el = document.elementFromPoint(clientX, clientY) as KeyElement;
      if (el.keyController) {
        // For all keys that we determine the user is touching, call press()
        // on the keyController. Don't worry about pressing keys that are
        // already pressed because the key controller will ignore it.
        el.keyController.press();

        // Also, store which key controllers we're touching because later on
        // we want to release all pressed keys that we determine are not
        // currently being touched.
        touchedKeyControllers = [...touchedKeyControllers, el.keyController];
      }
    }
    return touchedKeyControllers;
  }

  const releaseKeysThatAreNotTouched = (
    touchedKeyControllers: KeyController[]
  ) => {
    keyControllers
      .filter(kc => kc.isPressed)
      .filter(kc => !touchedKeyControllers.includes(kc))
      .forEach(kc => kc.release());
  }
  
  const syncKeysWithTouches = (event: Event) => {
    const e = event as TouchEvent;
    e.preventDefault();
    e.stopPropagation();
    const touchedKeyControllers = pressKeysThatAreTouched(e.touches);
    releaseKeysThatAreNotTouched(touchedKeyControllers);
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
   */
  el.addEventListener('touchstart', syncKeysWithTouches, {passive: false});
  el.addEventListener('touchmove', syncKeysWithTouches, {passive: false});
  el.addEventListener('touchend', syncKeysWithTouches, {passive: false});
  el.addEventListener('touchcancel', syncKeysWithTouches, {passive: false});
}


/**
 * Add event listeners to make a component behave like a key within a keyboard.
 */
export function keyAction(element: Element, keyController: KeyController) {

  const el = element as KeyElement;

  /**
   * Onto the calling component's DOM node, attach a reference to the controller
   * so that we can control it once parent components find this element via
   * document.elementFromPoint().
   */
  el.keyController = keyController;

  const handleMouseBegin = (event: Event) => {
    const e = event as MouseEvent;
    e.preventDefault();
    e.stopPropagation();
    // Validate `buttons` for two reasons:
    // - Don't fire when hovering on `mouseover`.
    // - Don't fire when right-clicking on `mousedown`.
    e.buttons === 1 ? keyController.press() : null
  }

  /**
   * The event handlers here only deal with mouse events. Touch events are
   * handled within keyboardAction. See the comments on the event listeners
   * there for more notes about this setup.
   */
  el.addEventListener('mousedown', handleMouseBegin);
  el.addEventListener('mouseover', handleMouseBegin);
  el.addEventListener('contextmenu', () => {});
  el.addEventListener('mouseup', e => keyController.release());
  el.addEventListener('mouseout', e => keyController.release());
  el.addEventListener('mouseleave', e => keyController.release());
  
}