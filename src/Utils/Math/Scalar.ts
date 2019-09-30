import {musicTheory} from "./../../Data/musicTheory";

const PI = Math.PI;
/**
 * Helper functions to deal with plain scalar numbers
 */
export class Scalar {

  /**
   * Ensure that `value` is within range between 0 and `max`. If `value` is
   * negative, then it's shifted up enough to make it positive. If `values` is
   * greater than `max`, then it's shifted down to make it in-range.
   */
  static wrap(value: number, max: number): number {
    let shift = (value < 0) ? Math.ceil(Math.abs(value) / max) * max : 0;
    let positiveValue = value + shift;
    return positiveValue % max;
  }

  /**
   * Ensure that `value` is within range between 0 and the number of octave
   * divisions (typically 12).
   */
  static wrapToOctave(value: number): number {
    return Scalar.wrap(value, musicTheory.octaveDivisions);
  }

  /**
   * Return the factor by which a radius should be reduced when it lies on the
   * edge between two keys. We want to reduce it so that we get straight lines
   * between keys.
   */
  static get rFactorAtEdge(): number {
    return Math.cos(PI / musicTheory.octaveDivisions);
  }

}