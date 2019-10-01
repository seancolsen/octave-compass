import { musicTheory } from "./../../Data/musicTheory";
import { IntervalSet } from "./IntervalSet";

const divisions = musicTheory.octaveDivisions;

/**
 * Static functions to deal with integer numbers as binary representations of
 * IntervalSets
 */
export class IntervalSetBinary {

  /**
   * Convert one interval ordinal to a binary representation of that interval.
   */
  static fromOrdinal(ordinal: number): number {
    return Math.pow(2, ordinal);
  }

  /**
   * Convert an array of interval ordinals to a binary representation of those
   * intervals.
   */
  static fromOrdinals(ordinals: number[]): number {
    return ordinals
      .map(IntervalSetBinary.fromOrdinal)
      .reduce((a, b) => a + b, 0);
  }

  /**
   * Convert a binary representation of intervals to an array of interval
   * ordinals.
   */
  static toOrdinals(binary: number): number[] {
    let result: number[] = [];
    IntervalSet.chromaticOrdinals.forEach(ordinal => {
      if (IntervalSetBinary.containsOrdinal(binary, ordinal)) {
        result.push(ordinal);
      }
    });
    return result;
  }

  /**
   * Return true if the given binary interval set contains the given ordinal.
   */
  static containsOrdinal(binary: number, ordinal: number): boolean {
    return (binary & IntervalSetBinary.fromOrdinal(ordinal)) > 0;
  }

  /**
   * Return the interval set to represent the chromatic scale (all notes).
   */
  static get chromatic() {
    return Math.pow(2, divisions) - 1
  }

  /**
   * Apply a bit mask to a binary interval representation.
   */
  static mask(binary: number, mask: number): number {
    return binary & mask;
  }

  /**
   * Return a binary interval set with intervals eliminated that fall outside
   * the chromatic set.
   */
  static onlyChromatic(binary: number): number {
    return IntervalSetBinary.mask(binary, IntervalSetBinary.chromatic);
  }

  /**
   * Return a binary interval set with the tonal center activated even if
   * it's inactive in the given set.
   */
  static guaranteedToContainTonalCenter(binary: number): number {
    return binary | 1;
  }

}