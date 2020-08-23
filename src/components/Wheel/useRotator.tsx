import React, { useState } from 'react';
import { Scalar } from '../../Utils/Math/Scalar';
import { Ordinal } from '../../Utils/Music/Ordinal';
import { Group } from './common/Group';
import { XyPoint } from '../../Utils/Geometry/XyPoint';


/**
 * Find the client coordinates of the X/Y center of the SVG element that
 * contains the element which generated the given event. This function helps us
 * determine the center of rotation, by assuming that it's at the center of the
 * SVG -- an assumption that, for the time being is hard-coded into this app.
 */
const centerOfContainingSvg = (e: React.PointerEvent) => {
  const target = e.target as SVGElement;
  const svg = (target.tagName === "svg") ? target : target.viewportElement;
  if (!svg) {
    throw new Error('Unable to find target SVG element from mouse event');
  }
  const r = svg.getBoundingClientRect() as DOMRect;
  return new XyPoint(r.x + r.height/2, r.y + r.width/2);
};

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

  const ref = React.createRef<SVGGElement>();

  
  /**
   * The point (in page space) around which the object rotates. Null when we
   * don't know yet.
   */
  const [center, setCenter] = useState<XyPoint | null>(null);

  /**
   * The current value of rotation, which changes constantly as the user
   * interacts with the object.
   */
  const [rotation, setRotation] = useState(0);

  /**
   * The rotation value that will be set if the user releases the object at
   * its current position.
   */
  const [currentDetent, setCurrentDetent] = useState<number | null>(null);

  /**
   * Resting means nothing is happening. Rotating means the user is
   * interacting with the object. Transitioning means the user has released
   * the object and the object is automatically moving to the nearest detent.
   */
  type StatusOptions = 'resting' | 'rotating' | 'transitioning';
  const [status, setStatus] = useState<StatusOptions>('resting');

  /**
   * When the object is a rest, its rotation is 0, so the rotation when the
   * user grabs the object is almost always 0. It will be non-zero in cases
   * where the user grabs the object during the object's final transition to
   * the nearest detent after the user releases it.
   */
  const [rotationWhenGrabbed, setRotationWhenGrabbed] =
    useState<number | null>(null);

  /**
   * The angle of the user's mouse or touch at the point of the grab. Will be
   * null when the user hasn't yet grabbed the object.
   */
  const [initialGrabAngle, setInitialGrabAngle] =
    useState<number | null>(null);


  // const state = useLocalStore(() => ({

  //   /**
  //    * The point (in page space) around which the object rotates. Null when we
  //    * don't know yet.
  //    */
  //   center: null as XyPoint | null,

  //   /**
  //    * The current value of rotation, which changes constantly as the user
  //    * interacts with the object.
  //    */
  //   rotation: 0,

  //   /**
  //    * The rotation value that will be set if the user releases the object at
  //    * its current position.
  //    */
  //   currentDetent: null as number | null,

  //   /**
  //    * Resting means nothing is happening. Rotating means the user is
  //    * interacting with the object. Transitioning means the user has released
  //    * the object and the object is automatically moving to the nearest detent.
  //    */
  //   status: 'resting' as 'resting' | 'rotating' | 'transitioning',

  //   /**
  //    * When the object is a rest, its rotation is 0, so the rotation when the
  //    * user grabs the object is almost always 0. It will be non-zero in cases
  //    * where the user grabs the object during the object's final transition to
  //    * the nearest detent after the user releases it.
  //    */
  //   rotationWhenGrabbed: null as number | null,

  //   /**
  //    * The angle of the user's mouse or touch at the point of the grab. Will be
  //    * null when the user hasn't yet grabbed the object.
  //    */
  //   initialGrabAngle: null as number | null,

  // }));

  // /**
  //  * We're using native events instead of React events because I couldn't
  //  * figure out how to use setPointerCapture with React events. Because we're
  //  * using native events, we need to add (and remove, within `tearDown`) the
  //  * appropriate event handlers manually.
  //  */
  // const setUp = () => {
  //   if (!ref.current) {return;}
  //   const el = ref.current;

  //   el.ongotpointercapture = () => console.log('got capture');
  //   el.onlostpointercapture = () => console.log('lost capture');

  //   el.onpointerdown = handlePointerDown;
  //   el.onpointerup = handlePointerUp;
  //   el.onpointercancel = handlePointerUp;
  // };

  // /**
  //  * Run setUp() when component mounts.
  //  */
  // useEffect(setUp);

  const startRotating = (e: React.PointerEvent) => {
    e.preventDefault();
    e.persist()
    const el = e.target as SVGGElement;
    el.setPointerCapture(e.pointerId);
    
    if (e.button !== 0 || status === 'rotating') {
      // Don't rotate in response to right-clicks, and also give up if we've got
      // more than one touch.
      transitionToRest(e);
      return;
    }
    // setCenter(centerOfContainingSvg(e));
    // setInitialGrabAngle(pointerGrabAngle(e));
    setStatus('rotating');
    // setRotationWhenGrabbed(rotation);
    console.log('down');
    // console.log(el);
    // console.log(e.pointerId);
    // console.log(el.setPointerCapture)
  };

  /**
   * This is the function that gets called over and over while the user
   * interacts with the object.
   */
  const updateRotationFromPointer = (e: React.PointerEvent) => {
    
    console.log('move');
    // if (status !== 'rotating') { return; }
    
    // e.preventDefault();
    // const grabAngle = pointerGrabAngle(e);
    // if (!grabAngle) { transitionToRest(e); return; }
    
    // rotation = grabAngle +
    //   (rotationWhenGrabbed || 0) - (initialGrabAngle || 0);
    
    // currentDetent = Scalar.wrapToOctave(
    //   props.detents ?
    //     Ordinal.nearestValid(rotation, props.detents) :
    //     // If we don't have detents then assume integers are detents.
    //     Math.round(rotation)
    // );
  };

  /**
   * Given a pointer event, and assuming we have already set the position of the
   * rotation center as `center`, then compute the grab angle of the
   * pointer's position.
   */
  const pointerGrabAngle = (e: React.PointerEvent) => {
    if (!center) {return null;}
    return (new XyPoint(e.clientX, e.clientY)).minus(center).toI();
  }

  /**
   * Stop user interaction and transition gradually to the nearest detent.
   */
  const transitionToRest = (e: React.PointerEvent) => {
    console.log('up');
    const el = e.target as SVGGElement;
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    if (status !== 'rotating') {
      // If we're at rest or (somehow) already transitioning, then no need to do
      // anything else.
      return;
    }
    setInitialGrabAngle(null);
    setStatus('resting');
    setRotation(0); // TODO transition to 0 gradually
    const detent = currentDetent ?? rotation;
    setCurrentDetent(null);
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

    /**
     * Gives the rotation value at which the object will come to rest after
     * the user releases the object at its current position.
     */
    currentDetent: currentDetent,

    /**
     * True when the user is interacting with the object, and also true when the
     * object is transitioning to rest after the user has released it.
     */
    isRotating: status !== 'resting',

    /**
     * A React component used to wrap the SVG element that we want to rotate.
     */
    Container(p: {children: (props: ContainerProps) => JSX.Element}) {
      return (
        <Group
          rotation={rotation}
          onPointerDown={startRotating}
          onPointerUp={transitionToRest}
          onPointerCancel={transitionToRest}
          onPointerMove={updateRotationFromPointer}
          onGotPointerCapture={() => console.log('captured')}
          onLostPointerCapture={() => console.log('released')}
          ref={ref}
        >
          {p.children({rotation: rotation})}
        </Group>
      );
    }, // Container

  }; // return

}; // useRotator
