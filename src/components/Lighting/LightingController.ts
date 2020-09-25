import type {Light} from './Light';

export type LightClassMatcher = (classes: string[]) => boolean;
export type LightCommand = (light: Light) => void;

export class LightingController {

  lights = [] as Light[];
  
  /**
   * Dispatch a command to all LightingControllers that match the supplied
   * criteria.
   *
   * @param command Gives access to each LightingController in order to run the
   * same command on all.
   *
   * @param classMatcher A function to decide which LightingControllers to
   * include in this dispatch. For every possible LightingController, the
   * function will be called and passed the array of classes which describe that
   * LightingController. If the function returns `true` then the
   * LightingController will be included.
   */
  dispatch(classMatcher: LightClassMatcher, command: LightCommand) {
    this.lights
      .filter(light => classMatcher(light.classes))
      .forEach(light => command(light));
  }

  register(light: Light) {
    this.lights = [...this.lights, light];
  }

  unregister(light: Light) {
    this.lights = this.lights.filter(l => l !== light);
  }
  
}