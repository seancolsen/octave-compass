import IntervalSet from "Utils/Music/IntervalSet";
import {scales as allScales} from "Data/scales";

export default class Scale extends IntervalSet {

  /**
   * All the names that can be used to refer to this scale.
   *
   * @type {string[]}
   */
  names;

  /**
   * The primary name to display when this scale is selected.
   *
   * @type {string}
   */
  defaultName;

  /**
   * The non-primary names.
   *
   * @type {string[]}
   */
  alternateNames;

  constructor(scaleData) {
    super(scaleData);
    this.names = scaleData.names;
    this.defaultName = scaleData.defaultName;
    this.alternateNames = scaleData.alternateNames;
  }

  /**
   * Given the binary intervals of a scale, search for the definition of that
   * scale and return a Scale object if possible.
   *
   * @param {int} binary
   * @return {Scale}
   * @throws {Error} if the scale can not be found
   */
  static fromBinary(binary) {
    const scaleEntry = allScales[binary];
    if (!scaleEntry) {
      throw new Error("Unknown scale");
    }
    const scaleData = {};
    scaleData.binary = binary;
    scaleData.names = scaleEntry;
    scaleData.defaultName = scaleEntry[0];
    scaleData.alternateNames = scaleEntry.slice(1);
    return new Scale(scaleData);
  }

}
