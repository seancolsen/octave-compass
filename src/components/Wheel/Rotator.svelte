<script lang="ts">

</script>

<!-- import React from 'react';
import { Scalar } from '../../Utils/Math/Scalar';
import { Ordinal } from '../../Utils/Music/Ordinal';
import { Group } from './common/Group';
import { XyPoint } from '../../Utils/Geometry/XyPoint';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { musicTheory } from '../../Data/musicTheory';

const transitionVelocity = 0.01; // (Interval / ms)

/**
 * Find the client coordinates of the X/Y center of the SVG element that
 * contains the element which generated the given event. This function helps us
 * determine the center of rotation, by assuming that it's at the center of the
 * SVG -- an assumption that, for the time being is hard-coded into this app.
 */
const centerOfContainingSvg = (element: Element) => {
  const el = element as SVGElement;
  const svg = (el.tagName === "svg") ? el : el.viewportElement;
    if (!svg) {
      throw new Error('Unable to find target SVG element from mouse event');
    }
  const r = svg.getBoundingClientRect() as DOMRect;
  return new XyPoint(r.x + r.height/2, r.y + r.width/2);
};

interface RenderProps {
  /**
   * Gives the current rotation as the user interacts with the object. Note
   * that the SVG G element already performs the SVG transform, and 
   * you'll only need to pass this value to children components if you want
   * them to have additional side-effects from the rotation, like the seats
   * on a ferris wheel.
   */
  rotation: number,

  /**
   * Gives the rotation value at which the object will come to rest after
   * the user releases the object at its current position.
   */
  currentDetent: number | null,
}

interface Props {

  /**
   * When true the user will be able to rotate the object. Defaults to true.
   */
  isRotatable?: boolean,

  /**
   * This function is called when the user grabs the object.
   */
  onRotationStart(): void,
  
  /**
   * This function will be executed after the user finishes rotating the object.
   * 
   * @param restingRotation
   * The rotation value after the user has released the object, and (if detents
   * are provided) after the object has come to rest at one of the detents.
   */
  onRotationRest(restingRotation: number): void,

  /**
   * If an array of detent numbers are given, then the rotated object will only
   * be able to rest at one of those detents. These are essentially valid
   * resting rotation values. The user will still be able to rotate the object
   * continuously, but when the user releases the object, the object will
   * transition to rest at the nearest detent value. If null is given, integers
   * are assumed to be detents. If 0 is not present in the values, it will be
   * added.
   * 
   * The units for these detent values is in "intervals".
   * 
   * E.g.
   * [4, 7]
   * Would mean the user could only rotate the object to interval 4 (major 3rd)
   * and 7 (perfect 5th).
   */
  detents?: number[] | null,

  children: (props: RenderProps) => JSX.Element,
};

/**
 * A hook that helps create drag-to-rotate SVG elements.
 */
export const Rotator = (props: Props) => {

  const state = useLocalStore(() => ({

    /**
     * The point (in page space) around which the object rotates. Null when we
     * don't know yet.
     */
    center: null as XyPoint | null,

    /**
     * The current value of rotation, which changes constantly as the user
     * interacts with the object.
     */
    rotation: 0,

    /**
     * The rotation value that will be set if the user releases the object at
     * its current position.
     */
    currentDetent: null as number | null,

    /**
     * Resting means nothing is happening. Rotating means the user is
     * interacting with the object. Transitioning means the user has released
     * the object and the object is automatically moving to the nearest detent.
     */
    status: 'resting' as 'resting' | 'rotating' | 'transitioning',

    /**
     * When the object is a rest, its rotation is 0, so the rotation when the
     * user grabs the object is almost always 0. It will be non-zero in cases
     * where the user grabs the object during the object's final transition to
     * the nearest detent after the user releases it.
     */
    rotationWhenGrabbed: null as number | null,

    /**
     * The angle of the user's mouse or touch at the point of the grab. Will be
     * null when the user hasn't yet grabbed the object.
     */
    initialGrabAngle: null as number | null,

    /**
     * The time when the user stops interacting with the object and the object
     * begins transitioning. We need to store this so that we'll know how to
     * update the object's rotation as it transitions.
     */
    transitionStartTime: null as DOMHighResTimeStamp | null,

    /**
     * The rotation value when the user stops interacting with the object. We
     * need to store this so that we'll know how to update the object's rotation
     * as it transitions.
     */
    rotationUponTransitionStart: null as number | null,

    /**
     * How long (in ms) we want to spend transitioning the object to its resting
     * rotation after the user stops interacting with it. This value is smaller
     * when the object is closer to its resting rotation, and larger when we
     * need to do more rotation for the transition.
     */
    transitionDuration: null as number | null,

    /**
     * 1 for cases where we need to increase the rotation to get to the current
     * detent. -1 for cases where we need to decrease.
     */
    transitionDirection: 1,

  }));

  const startRotating = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const mouseEvent = e as React.MouseEvent;
    const touchEvent = e as React.TouchEvent;
    const isTouch = !!touchEvent.touches;
    const isMouse = !isTouch;
    const isRightClick = isMouse && mouseEvent.button !== 0;
    const isAlreadyRotating = state.status === 'rotating';
    if (isRightClick || isAlreadyRotating) {
      transitionToRest(e);
      return;
    }
    props.onRotationStart();
    state.center = centerOfContainingSvg(e.currentTarget);
    state.initialGrabAngle = pointerGrabAngle(e);
    state.status = 'rotating';
    state.rotationWhenGrabbed = state.rotation;
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
    if (state.status !== 'rotating') { return; }
    e.preventDefault();
    e.stopPropagation();
    const grabAngle = pointerGrabAngle(e);
    if (!grabAngle) { transitionToRest(e); return; }
    state.rotation = grabAngle + (state.rotationWhenGrabbed||0) - (state.initialGrabAngle||0);
    state.currentDetent = Scalar.wrapToOctave(
      props.detents ?
        Ordinal.nearestValid(state.rotation, props.detents) :
        // If we don't have detents then assume integers are detents.
        Math.round(state.rotation)
    );
  };

  /**
   * Given a pointer event, and assuming we have already set the position of the
   * rotation center as `center`, then compute the grab angle of the
   * pointer's position.
   */
  const pointerGrabAngle = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
  ) => {
    const mouseEvent = e as React.MouseEvent | MouseEvent;
    const touchEvent = e as React.TouchEvent | TouchEvent;
    const isTouch = !!touchEvent.touches;
    const specificEvent = isTouch ? touchEvent.touches[0] : mouseEvent;
    const x = specificEvent.clientX;
    const y = specificEvent.clientY;
    if (!state.center) {return null;}
    return (new XyPoint(x, y)).minus(state.center).toI();
  }

  /**
   * Stop user interaction and transition gradually to the nearest detent.
   */
  const transitionToRest = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.status !== 'rotating') {
      // If we're at rest or already transitioning, then we're done.
      return;
    }
    window.removeEventListener('mousemove', updateRotationFromPointer, true);
    window.removeEventListener('touchmove', updateRotationFromPointer, true);
    window.removeEventListener('mouseup', transitionToRest, true);
    window.removeEventListener('touchend', transitionToRest, true);
    window.removeEventListener('touchcancel', transitionToRest, true);
    const pad = musicTheory.octaveDivisions / 2;
    const detent = state.currentDetent || 0;
    state.rotation = Scalar.wrap(state.rotation, detent - pad, detent + pad);
    const deltaR = detent - state.rotation;
    state.transitionDuration = Math.abs(deltaR) / transitionVelocity;
    state.transitionDirection = Math.sign(deltaR);
    window.requestAnimationFrame(stepTransition);
  };

  /**
   * Update this component's state to advance one frame ahead in the animation
   * which transitions the object from its final rotation when released to its
   * detent. This function is called recursively by requestAnimationFrame()
   * until the object is done transitioning.
   */
  const stepTransition = (currentTime: DOMHighResTimeStamp) => {
    if (state.transitionStartTime === null) {
      state.transitionStartTime = currentTime;
    }
    if (state.rotationUponTransitionStart === null) {
      state.rotationUponTransitionStart = state.rotation;
    }
    const r0 = state.rotationUponTransitionStart || 0; // rotation, initial
    const timeElapsed = currentTime - state.transitionStartTime;
    const transitionIsComplete = timeElapsed >= (state.transitionDuration || 0);
    if (transitionIsComplete) {
      handleRest();
    }
    else {
      const deltaR = transitionVelocity * timeElapsed * state.transitionDirection;
      state.rotation =  deltaR + r0;
      window.requestAnimationFrame(stepTransition);
    }
  };

  const handleRest = () => {
    const detent = state.currentDetent ?? state.rotation;
    props.onRotationRest(detent);
    state.initialGrabAngle = null;
    state.status = 'resting';
    state.rotation = 0;
    state.currentDetent = null;
    state.transitionStartTime = null;
    state.rotationUponTransitionStart = null;
  };

  return useObserver(() =>
    <Group
      rotation={state.rotation}
      onMouseDown={props.isRotatable ? startRotating : undefined}
      onTouchStart={props.isRotatable ? startRotating : undefined}
      style={{cursor: props.isRotatable ? 'grab' : 'default'}}
    >{
      props.children({
        rotation: state.rotation,
        currentDetent: state.currentDetent
      })
    }</Group>
  );

}; -->
