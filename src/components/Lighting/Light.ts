import {writable} from 'svelte/store';
import {onMount, onDestroy} from 'svelte';
import {getStore} from '../../store';

export class Light {

  classes: string[];

  brightness = writable(0);

  constructor(classes: string[]) {
    this.classes = classes;
  }
  
  turnOn() {
    this.brightness.set(1);
  }

  turnOff() {
    this.brightness.set(0);
  }

}

/**
 * Attach a LightingController to a svelte component
 */
export const useLight = (classes: string[]) => {
  const {lightingController} = getStore();
  const light = new Light(classes);
  onMount(() => lightingController.register(light));
  onDestroy(() => lightingController.unregister(light));
  return light.brightness;
}
