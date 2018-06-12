import IntervalSetFactory from "Utils/Music/IntervalSetFactory";
import Scalar from "Utils/Math/Scalar";

const separator = '-';
const defaultIntervalSetBin = 0b101010110101;
const defaultTonalCenter = 0;
/**
 * This app keeps the browser URL in sync with some of the state values. This
 * class provides functions for converting state values to a URL and
 * converting a URL to state values.
 */
export default class Url {

  /**
   * Clean up input strings to match our desired formatting.
   *
   * @param {string} url
   * @return {string}
   */
  static normalize(url) {
    return url.replace(/[^0-9-]/g, '');
  }

  /**
   * Test two URL paths for equality.
   *
   * @param {string} a
   * @param {string} b
   * @return {boolean}
   */
  static pathsAreEqual(a, b) {
    return Url.normalize(a) === Url.normalize(b);
  }

  /**
   * Parse a URL to determine the state that it represents.
   *
   * @param {string} url
   * @return {{intervalSet: IntervalSet, tonalCenter: string}}
   */
  static parse(url) {
    const parts = Url.normalize(url).split(separator);
    const intervalSetBin = parseInt(parts[0], 10) || defaultIntervalSetBin;
    const intervalSet = IntervalSetFactory.fromBinary(intervalSetBin);
    const tonalCenter = parseInt(parts[1], 10) || defaultTonalCenter;
    const validIntervalSet = intervalSet.activateIntervalOrdinal(0);
    const validTonalCenter = Scalar.wrapToOctave(tonalCenter);
    return {
      intervalSet: validIntervalSet,
      tonalCenter: validTonalCenter,
    };
  }

  /**
   * Generate a URL that encapsulates the supplied state.
   *
   * @param {IntervalSet} intervalSet
   * @param {int} tonalCenter
   * @return {string}
   */
  static generate(intervalSet, tonalCenter) {
    let result = '';
    result += intervalSet.binary;
    if (tonalCenter) {
      result += separator + tonalCenter;
    }
    return result;
  }

}