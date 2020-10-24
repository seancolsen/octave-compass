import {writable} from 'svelte/store';

export class RotationController {
  
  /**
   * The current value of rotation, which changes constantly as the user
   * interacts with the object.
   */
  rotation = writable(0);

  /**
   * The rotation value that will be set if the user releases the object at
   * its current position.
   */
  currentDetent = writable(0);

  /**
   * True when the user is rotating the object and also when the object is
   * transitioning to rest after the user has released it.
   */
  isRotating = writable(false as boolean);

}
