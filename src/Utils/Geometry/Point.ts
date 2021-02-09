export interface Point {
  
  /**
   * Check that two points are in the same location, even if we have some error
   * due to floating point math.
   */
  roughlyEquals(point: Point): boolean;

  /**
   * Vector addition
   */
  plus(point: Point): Point;

}
