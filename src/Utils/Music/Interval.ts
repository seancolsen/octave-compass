import { musicTheory } from "../../Data/musicTheory";
import { Scalar } from "../Math/Scalar";

export class Interval {

  /**
   * The integer representation of this interval with "tonal center" being 0 and
   * "minor 2" being 1.
   */
  id: number;

  /**
   * A name like 'Minor 3'.
   */
  longName: string;

  /**
   * A name like '♭3'.
   */
  shortName: string;

  constructor(id: number) {
    this.id = Scalar.wrapToOctave(id);
    const intervalData = musicTheory.intervals[id];
    if (!intervalData) {
      throw new Error('Invalid interval ID');
    }
    this.longName = intervalData.longName;
    this.shortName = intervalData.shortName;
  }
  
}
