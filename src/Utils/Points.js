import Point from "./Point";

/**
 * Utility class to deal with arrays of points
 */
export default class Points {

  /**
   * Convert an array of points in constellation coordinates to a string of
   * points in cartesian coordinates that can be fed directly into an SVG
   * attribute.
   *
   * @param {[[{number},{number}]]} pointsInIR
   * @return {string}
   */
  static stringFromIR(pointsInIR) {
    let pointsInXY = pointsInIR.map((point) => Point.ir_xy(point));
    return pointsInXY.map((point) => point.join(',')).join(' ');
  }

}
