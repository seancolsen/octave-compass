import React, { useEffect } from 'react';
import { Scalar } from '../../Utils/Math/Scalar';
import { Ordinal } from '../../Utils/Music/Ordinal';
import { Group } from './common/Group';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { XyPoint } from '../../Utils/Geometry/XyPoint';
import { useSubscribeToPointer, PointerBroadcastEvent } from '../PointerBroadcaster';

interface Props {
  /**
   * This function will be executed after the user finishes rotating the object.
   * 
   * @param restingRotation
   * The rotation value after the user has released the object, and (if detents
   * are provided) after the object has come to rest at one of the detents.
   */
  afterRotating(restingRotation: number): void;

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
  detents?: number[] | null;
};

/**
 * A hook that helps create drag-to-rotate SVG elements.
 */
export function useRotator(props: Props) {

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
     * Stores the ID of the touch first used to grab the object. This way we can
     * distinguish the touch used for this object separately from other touches
     * present while rotating. Null if the user grabs the object via the mouse.
     */
    touchIdentifier: null as number | null,

    /**
     * When subscribing to pointer activity, we get an unsubscribe function. We
     * store that function here so that we can call it later when we want to
     * unsubscribe.
     */
    unsubscribeFromPointer: () => {},
  }));

  const subscribeToPointer = useSubscribeToPointer();

  const handleMouseDown = (event: React.MouseEvent) => {
    state.touchIdentifier = null;
    if (event.button !== 0) {
      event.preventDefault();
      transitionToRest();
      return;
    }
    if (state.status === 'rotating') {return;} // Ignore if already rotating
    setCenter(event);
    state.initialGrabAngle = grabAngleFromEvents(event, null);
    startRotating();
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    event.preventDefault(); // to prevent touch-to-scroll
    if (state.status === 'rotating') {return;} // Ignore if already rotating
    const touch = event.changedTouches[0];
    state.touchIdentifier = touch.identifier;
    setCenter(touch);
    state.initialGrabAngle = grabAngleFromEvents(null, touch);
    startRotating();
  };

  const startRotating = () => {
    state.status = 'rotating';
    state.rotationWhenGrabbed = state.rotation;
    state.unsubscribeFromPointer = subscribeToPointer(handlePointerBroadcast);
  };

  /**
   * Figure out where in the page is the center of the object being rotated.
   * 
   * Baked into this logic is the assumption that the object will be at the
   * center of the SVG containing it.
   */
  const setCenter = (event: React.MouseEvent | React.Touch) => {
    const target = event.target as SVGElement;
    const svg = (target.tagName === "svg") ? target : target.viewportElement;
    if (!svg) {
      throw new Error('Unable to find target SVG element from mouse event');
    }
    const r = svg.getBoundingClientRect() as DOMRect;
    state.center = new XyPoint(r.x + r.height/2, r.y + r.width/2);
  };

  /**
   * Use one of two events to compute a grab angle
   */
  const grabAngleFromEvents = (
    mouse: React.MouseEvent | null | undefined, 
    touch: React.Touch | null | undefined
    ) => {
      const event = mouse ?? touch;
      if (!event || !state.center) {return null;}
      const position = new XyPoint(event.pageX, event.pageY);
      return position.minus(state.center).toI();
    }

  /**
   * This is the function that gets called over and over while the user
   * interacts with the object.
   * 
   * @param e 
   * The broadcast event sent by the PointerBroadcaster
   */
  const handlePointerBroadcast = (e: PointerBroadcastEvent) => {
    const touch = state.touchIdentifier === null ? 
      null : (e.touchEvent?.touches.item(state.touchIdentifier) || null);
    const mouse = state.touchIdentifier === null ?
      (e.mouseEvent || null) : null;
    const grabAngle = grabAngleFromEvents(mouse, touch);
    if (!grabAngle || e.isEnd) { transitionToRest(); return; }
    if (touch) { e.touchEvent?.preventDefault(); /* Don't scroll page. */ }
    
    // Set the rotation.
    state.rotation = grabAngle +
      (state.rotationWhenGrabbed || 0) - (state.initialGrabAngle || 0);
    
    // Set the detent.
    state.currentDetent = Scalar.wrapToOctave(
      props.detents ?
        Ordinal.nearestValid(state.rotation, props.detents) :
        // If we don't have detents then assume integers are detents.
        Math.round(state.rotation)
    );
  };

  const transitionToRest = () => {
    state.unsubscribeFromPointer();
    if (state.status !== 'rotating') {
      // If we're at rest or (somehow) already transitioning, then no need to do
      // anything else.
      return;
    }
    state.initialGrabAngle = null;
    const rotation = state.rotation;
    state.status = 'resting';
    state.rotation = 0; // TODO transition to 0 gradually
    const detent = state.currentDetent ?? rotation;
    state.currentDetent = null;
    props.afterRotating(detent);
  };

  interface ContainerProps {
    /**
     * Gives the current rotation as the user interacts with the object. Note
     * that the container component already performs the SVG transform, and 
     * you'll only need to pass this value to children components if you want
     * them to have additional side-effects from the rotation, like the seats
     * on a ferris wheel.
     * 
     * Why is this a render prop and not passed directly in the return from
     * useRotator? Because as the user interacts with the object, this rotation
     * value gets updated very frequently. Passing it as a render prop allows us
     * to update only the child component without updating the component calling
     * the useRotator hook. This is faster. I tried it first by passing rotation
     * in the return, and although it worked, it was noticeably slower.
     */
    rotation: number,
  }
  
  return {

    
    // rotation: state.rotation,

    /**
     * Gives the rotation value at which the object will come to rest after
     * the user releases the object at its current position.
     */
    currentDetent: state.currentDetent,

    /**
     * True when the user is interacting with the object, and also true when the
     * object is transitioning to rest after the user has released it.
     */
    isRotating: state.status !== 'resting',

    /**
     * A React component used to wrap the SVG element that we want to rotate.
     */
    Container(props: {children: (props: ContainerProps) => JSX.Element}) {
      return useObserver(() =>
        <Group
          rotation={state.rotation}
          onMouseDown={(e: React.MouseEvent) => handleMouseDown(e)}
          onTouchStart={(e: React.TouchEvent) => handleTouchStart(e)}
        >
          {props.children({rotation: state.rotation})}
        </Group>
      );
    }, // Container

  }; // return

}; // useRotator
