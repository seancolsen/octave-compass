import {default as computedData} from "../../Data/computedData.json";
import { IntervalSet } from "./IntervalSet";
import { IntervalSetName } from "./IntervalSetName";

export interface ScaleData {
  binary: number;
  names: string[];
}

export class Scale {

  binary: number;

  names: string[];

  constructor(data: ScaleData) {
    this.binary = data.binary;
    this.names = data.names;
  }

  get defaultName(): string {
    return this.names[0];
  }

  get alternateNames(): string[] {
    return this.names.slice(1);
  }

  get intervalSetName(): IntervalSetName {
    return new IntervalSetName({
      binary: this.binary,
      baseName: this.defaultName,
      genus: 'Scale',
    });
  }

  get intervalSet(): IntervalSet {
    return IntervalSet.fromBinary(this.binary);
  }

  /**
   * Given the binary intervals of a scale, search for the definition of that
   * scale and return a Scale object if possible.
   */
  static fromBinary(binary: number): Scale {
    const scaleEntry = computedData.scales.find(s => s.binary === binary);
    if (!scaleEntry?.names) {
      throw new Error('Unknown scale');
    }
    return new Scale({binary, names: scaleEntry.names});
  }

}
