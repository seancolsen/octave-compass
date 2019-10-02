import { IntervalSet } from "./IntervalSet";
import { Chord } from "./Chord";
import { Scale } from "./Scale";

/**
 * This class exists to create IntervalSets of various types.
 *
 * I would have liked to put the logic here in the IntervalSet class instead,
 * but javascript wouldn't allow it, due to a circular import dependency.
 * Breaking it out into a separate class solved that issue, although I'm still
 * not sure if there's maybe a better way to set this up.
 */
export class IntervalSetFactory {

  /**
   * When given a generic IntervalSet, try to return a Scale or a Chord in its
   * place if possible. If no Scale or Chord can be found to match the supplied
   * generic IntervalSet, then return the generic IntervalSet.
   */
  static fromIntervalSet(intervalSet: IntervalSet): IntervalSet {
    try {
      return Scale.fromBinary(intervalSet.binary);
    }
    catch (e) {
    }
    try {
      return Chord.fromBinary(intervalSet.binary);
    }
    catch (e) {
    }
    return intervalSet;
  }

  static fromBinary(binary: number): IntervalSet {
    return IntervalSetFactory.fromIntervalSet(IntervalSet.fromBinary(binary));
  }

}