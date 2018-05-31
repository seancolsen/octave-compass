import IntervalSetFactory from "./IntervalSetFactory";

const separator = '-';
const defaultIntervalSetBin = 0b101010110101; // Major scale
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
    return {
      intervalSet: intervalSet,
      tonalCenter: tonalCenter,
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
