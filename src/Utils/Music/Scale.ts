import { IntervalSet } from "./IntervalSet";
import { scales as allScales } from "./../../Data/scales";

export interface ScaleData {
  binary: number;
  names: string[];
  defaultName: string;
  alternateNames: string[];
}

export class Scale extends IntervalSet {

  /**
   * All the names that can be used to refer to this scale.
   */
  names: string[];

  /**
   * The primary name to display when this scale is selected.
   */
  defaultName: string;

  /**
   * The non-primary names.
   */
  alternateNames: string[];

  constructor(scaleData: ScaleData) {
    super(scaleData);
    this.names = scaleData.names;
    this.defaultName = scaleData.defaultName;
    this.alternateNames = scaleData.alternateNames;
  }

  /**
   * Given the binary intervals of a scale, search for the definition of that
   * scale and return a Scale object if possible.
   * 
   * @throws {Error} if the scale can not be found
   */
  static fromBinary(binary: number): Scale {
    const scaleEntry = allScales[binary];
    if (!scaleEntry) {
      throw new Error("Unknown scale");
    }
    return new Scale({
      binary: binary,
      names: scaleEntry,
      defaultName: scaleEntry[0],
      alternateNames: scaleEntry.slice(1),
    });
  }

}
