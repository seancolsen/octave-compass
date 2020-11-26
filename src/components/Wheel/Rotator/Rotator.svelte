<script lang="ts">
  import type { RotationController } from './RotationController';
  import { Scalar } from '../../../Utils/Math/Scalar';
  import { XyPoint } from '../../../Utils/Geometry/XyPoint';
  import { musicTheory } from '../../../Data/musicTheory';
  import { Angle } from '../../../Utils/Geometry/Angle';

  const transitionVelocity = 0.01; // (Interval / ms)

  /**
   * Find the client coordinates of the X/Y center of the SVG element that
   * contains the element which generated the given event. This function helps us
   * determine the center of rotation, by assuming that it's at the center of the
   * SVG -- an assumption that, for the time being is hard-coded into this app.
   */
  const centerOfContainingSvg = (element: EventTarget | null) => {
    const el = element as SVGElement;
    const svg = (el.tagName === "svg") ? el : el.viewportElement;
      if (!svg) {
        throw new Error('Unable to find target SVG element from mouse event');
      }
    const r = svg.getBoundingClientRect() as DOMRect;
    return new XyPoint(r.x + r.width/2, r.y + r.height/2);
  };

  /**
   * This is a bit weird, but some of the state of each rotator instance needs
   * to be accessible broadly throughout the app, so we store that state in
   * Rotator's parent component and then pass a reference to it into the
   * Rotator instance upon instantiation. Here's where that state gets passed
   * in.
   */
  export let controller: RotationController;
  const {rotation, currentDetent, isRotating} = controller;
  
  /**
   * When true the user will be able to rotate the object. Defaults to true.
   */
  export let isRotatable = true as boolean;

  /**
   * This function will be executed after the user finishes rotating the object.
   * 
   * @param restingRotation
   * The rotation value after the user has released the object, and (if detents
   * are provided) after the object has come to rest at one of the detents.
   */
  export let onRotationRest = (restingRotation: number) => {};

  /**
   * If an array of detent numbers are given, then the rotated object will only
   * be able to rest at one of those detents. These are essentially valid
   * resting rotation values. The user will still be able to rotate the object
   * continuously, but when the user releases the object, the object will
   * transition to rest at the nearest detent value. If undefined is given,
   * integers are assumed to be detents. If 0 is not present in the values, it
   * will be added.
   * 
   * The units for these detent values is in "intervals".
   * 
   * E.g.
   * [4, 7]
   * Would mean the user could only rotate the object to interval 4 (major 3rd)
   * and 7 (perfect 5th).
   */
  export let detents = undefined as number[] | undefined;

  /**
   * The point (in page space) around which the object rotates. Null when we
   * don't know yet.
   */
  let center = null as XyPoint | null;

  /**
   * When the object is a rest, its rotation is 0, so the rotation when the
   * user grabs the object is almost always 0. It will be non-zero in cases
   * where the user grabs the object during the object's final transition to
   * the nearest detent after the user releases it.
   */
  let rotationWhenGrabbed = null as number | null;

  /**
   * The angle of the user's mouse or touch at the point of the grab. Will be
   * null when the user hasn't yet grabbed the object.
   */
  let initialGrabAngle = null as number | null;

  /**
   * The time when the user stops interacting with the object and the object
   * begins transitioning. We need to store this so that we'll know how to
   * update the object's rotation as it transitions.
   */
  let transitionStartTime = null as DOMHighResTimeStamp | null;

  /**
   * The rotation value when the user stops interacting with the object. We
   * need to store this so that we'll know how to update the object's rotation
   * as it transitions.
   */
  let rotationUponTransitionStart = null as number | null;

  /**
   * How long (in ms) we want to spend transitioning the object to its resting
   * rotation after the user stops interacting with it. This value is smaller
   * when the object is closer to its resting rotation, and larger when we
   * need to do more rotation for the transition.
   */
  let transitionDuration = null as number | null;

  /**
   * 1 for cases where we need to increase the rotation to get to the current
   * detent. -1 for cases where we need to decrease.
   */
  let transitionDirection = 1;

  const startRotating = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const mouseEvent = e as MouseEvent;
    const touchEvent = e as TouchEvent;
    const isTouch = !!touchEvent.touches;
    const isMouse = !isTouch;
    const isRightClick = isMouse && mouseEvent.button !== 0;
    if (isRightClick || $isRotating) {
      transitionToRest(e);
      return;
    }
    center = centerOfContainingSvg(e.target);
    initialGrabAngle = pointerGrabAngle(e);
    $isRotating = true;
    rotationWhenGrabbed = $rotation;
    window.addEventListener('mousemove', updateRotationFromPointer, true);
    window.addEventListener('touchmove', updateRotationFromPointer, true);
    window.addEventListener('mouseup', transitionToRest, true);
    window.addEventListener('touchend', transitionToRest, true);
    window.addEventListener('touchcancel', transitionToRest, true);
  };

  /**
   * This is the function that gets called over and over while the user
   * interacts with the object.
   */
  const updateRotationFromPointer = (e: MouseEvent | TouchEvent) => {
    if (!$isRotating) { return; }
    e.stopPropagation();
    const grabAngle = pointerGrabAngle(e);
    if (!grabAngle) { transitionToRest(e); return; }
    $rotation = grabAngle + (rotationWhenGrabbed||0) - (initialGrabAngle||0);
    $currentDetent = Scalar.wrapToOctave(
      detents ?
        Angle.nearest($rotation, detents, musicTheory.octaveDivisions) :
        // If we don't have detents then assume integers are detents.
        Math.round($rotation)
    );
  };

  /**
   * Given a pointer event, and assuming we have already set the position of the
   * rotation center as `center`, then compute the grab angle of the
   * pointer's position.
   */
  const pointerGrabAngle = (e: MouseEvent | TouchEvent) => {
    const mouseEvent = e as MouseEvent;
    const touchEvent = e as TouchEvent;
    const isTouch = !!touchEvent.touches;
    const specificEvent = isTouch ? touchEvent.touches[0] : mouseEvent;
    const x = specificEvent.clientX;
    const y = specificEvent.clientY;
    if (!center) {return null;}
    return (new XyPoint(x, y)).minus(center).toI();
  }

  /**
   * Stop user interaction and transition gradually to the nearest detent.
   */
  const transitionToRest = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!$isRotating) {
      // If we're at rest or already transitioning, then we're done.
      return;
    }
    window.removeEventListener('mousemove', updateRotationFromPointer, true);
    window.removeEventListener('touchmove', updateRotationFromPointer, true);
    window.removeEventListener('mouseup', transitionToRest, true);
    window.removeEventListener('touchend', transitionToRest, true);
    window.removeEventListener('touchcancel', transitionToRest, true);
    const pad = musicTheory.octaveDivisions / 2;
    $rotation = Scalar.wrap($rotation, $currentDetent-pad, $currentDetent+pad);
    const deltaR = $currentDetent - $rotation;
    transitionDuration = Math.abs(deltaR) / transitionVelocity;
    transitionDirection = Math.sign(deltaR);
    window.requestAnimationFrame(stepTransition);
  };

  /**
   * Update this component's to advance one frame ahead in the animation
   * which transitions the object from its final rotation when released to its
   * detent. This function is called recursively by requestAnimationFrame()
   * until the object is done transitioning.
   */
  const stepTransition = (currentTime: DOMHighResTimeStamp) => {
    if (transitionStartTime === null) {
      transitionStartTime = currentTime;
    }
    if (rotationUponTransitionStart === null) {
      rotationUponTransitionStart = $rotation;
    }
    const r0 = rotationUponTransitionStart || 0; // rotation, initial
    const timeElapsed = currentTime - transitionStartTime;
    const transitionIsComplete = timeElapsed >= (transitionDuration || 0);
    if (transitionIsComplete) {
      handleRest();
    }
    else {
      const deltaR = transitionVelocity * timeElapsed * transitionDirection;
      $rotation =  deltaR + r0;
      window.requestAnimationFrame(stepTransition);
    }
  };

  const handleRest = () => {
    onRotationRest($currentDetent);
    initialGrabAngle = null;
    $isRotating = false;
    $rotation = 0;
    $currentDetent = 0;
    transitionStartTime = null;
    rotationUponTransitionStart = null;
  };

</script>

<g
  transform={`rotate(${Angle.iToD($rotation)})`}
  on:mousedown={isRotatable ? startRotating : undefined}
  on:touchstart|nonpassive={isRotatable ? startRotating : undefined}
  class:isRotatable
  class:isRotating={$isRotating}
  class:isOscillating={isRotatable && !$isRotating}
>
  <slot></slot>
</g>

<style>
  g.isRotatable :global(*) {cursor: grab;}
  g.isRotating :global(*) {cursor: grabbing;}
</style>