export abstract class Point {
  
  /**
   * Check that two points are in the same location, even if we have some error
   * due to floating point math.
   */
  abstract roughlyEquals(point: Point): boolean;

  /**
   * Vector addition
   */
  abstract plus(point: Point): Point;

}
