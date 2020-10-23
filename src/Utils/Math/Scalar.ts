import {musicTheory} from "./../../Data/musicTheory";

const PI = Math.PI;

/**
 * Helper functions to deal with plain scalar numbers
 */
export class Scalar {

  /**
   * Scale the input value so that its domain fits into the desired range of
   * output values.
   */
  static interpolate(
    input: number,
    domain: [number, number],
    range: [number, number]
  ) {
    const [x1, x2] = domain;
    const [y1, y2] = range;
    return  y1 + input*((y2-y1)/(x2-x1));
  }

  /**
   * Ensure that `value` is within a range between two numbers, specified by
   * `bounds`. If `value` is below the minimum, then it's shifted up enough to
   * make it fall within the bounds. If `value` is greater than `max`, then it's
   * shifted down to make it fall within the bounds.
   *
   * @param value The value to be shifted.
   *
   * @param bounds If you only give one number as a bound, then we'll assume 0
   * is the other bound. If you give two numbers, then they will both be used,
   * and you can give them in either order.
   *
   * @throws Error if bounds are zero width.
   */
  static wrap(value: number, ...bounds: [number] | [number, number]): number {
    const b = bounds.length === 1 ? [bounds[0], 0] : bounds;
    const min = Math.min(...b);
    const max = Math.max(...b);
    const intervalWidth = max - min;
    if (intervalWidth === 0) {
      throw new Error('Wrap bounds must have a width greater than zero.');
    }
    const result = 
        value < min  ? max - ((min - value) % intervalWidth)
      : value >= max ? min + ((value - max) % intervalWidth)
      : value;
    // Ensure we don't return negative zero.
    return Object.is(result, -0) ? 0 : result;
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