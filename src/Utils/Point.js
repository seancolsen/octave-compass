import {musicTheory} from '../Data/musicTheory.js';
import Scalar from './Scalar.js'

const PI = Math.PI;

/**
 * CONSTELLATION COORDINATE SYSTEM
 *
 * To make things easier in this app, we think of the objects existing within
 * a custom coordinate system, called the "constellation coordinate system". The
 * idea is similar to the polar coordinate system with a couple differences.
 *
 * The constellation coordinate system has the following two coordinates:
 *
 * - i -- to represent the musical interval (0 - 11)
 * - r -- to represent the radius (like in polar)
 *
 * When i = 0, we are at the top most part of the coordinate system (in contrast
 * with polar which puts theta = 0 at the right most part of the coordinate
 * system).
 *
 * As i increases, we move clockwise (in contrast to polar, which moves counter-
 * clockwise).
 *
 *
 * CARTESIAN COORDINATE SYSTEM
 *
 * Our cartesian coordinate system within this app considers the positive y
 * axis to be pointing down. We do this to match the way that SVG works.
 *
 *
 * POLAR COORDINATE SYSTEM
 *
 * We have utilities within this class for converting points to and from polar
 * coordinates, but they really only exist for the purpose of simplifying the
 * process of converting between points in constellation and cartesian.
 *
 */
export default class Point {

  /**
   * Return the factor by which a radius should be reduced when it lies on the
   * edge between two keys. We want to reduce it so that we get straight lines
   * between keys.
   *
   * @returns {number}
   */
  static get rFactorAtEdge() {
    return Math.cos(PI / musicTheory.octaveDivisions);
  }

  /**
   * Convert a "phi" coordinate `p` (as part of the standard polar coordinate
   * system) in radians to an "interval" coordinate `i` (as part of our custom
   * constellation coordinate system).
   *
   * @param {number} p
   * @returns {number}
   */
  static pToI(p) {
    return Scalar.wrap(musicTheory.octaveDivisions*(5/4 - p/(2*PI)), 12);
  }

  /**
   * Convert an "interval" coordinate `i` (as part of our custom constellation
   * coordinate system) to a "phi" coordinate `p` (as part of the standard polar
   * coordinate system) in radians.
   *
   * @param {number} i
   * @returns {number}
   */
  static iToP(i) {
    return Scalar.wrap((2 + 1/2)*PI - i*2*PI/musicTheory.octaveDivisions, 2*PI);
  }

  /**
   * Convert an array of constellation coordinates to an array of polar
   * coordinates.
   *
   * @param {[{number}, {number}]} ir
   * @returns {[{number}, {number}]}
   */
  static irToPr(ir) {
    let [i, r] = ir;
    return [this.iToP(i), r];
  }

  /**
   * Convert an array of polar coordinates to an array of constellation
   * coordinates.
   *
   * @param {[{number}, {number}]} pr
   * @returns {[{number}, {number}]}
   */
  static prToIr(pr) {
    let [p, r] = pr;
    return [this.pToI(p), r];
  }

  /**
   * Convert an array of polar coordinates to an array of cartesian coordinates
   *
   * @param {[{number}, {number}]}pr
   * @returns {[{number}, {number}]}
   */
  static prToXy(pr) {
    let [p, r] = pr;
    let x = r * Math.cos(p);
    let y = r * Math.sin(p);
    y = -y; // Flip axis, for SVG
    return [x , y];
  }

  /**
   * Convert an array of cartesian coordinates to an array of polar coordinates
   *
   * @param {[{number}, {number}]} xy
   * @returns {[{number}, {number}]}
   */
  static xyToPr(xy) {
    let [x, y] = xy;
    y = -y; // Flip axis, for SVG
    let p = Scalar.wrap(Math.atan2(y, x), 2 * PI);
    let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return [p, r];
  }

  /**
   * Convert an array of cartesian coordinates to an array of constellation
   * coordinates.
   *
   * @param {[{number}, {number}]} xy
   * @returns {[{number}, {number}]}
   */
  static xyToIr(xy) {
    return this.prToIr(this.xyToPr(xy));
  }

  /**
   * Convert an array of constellation coordinates to an array of cartesian
   * coordinates.
   *
   * @param {[{number}, {number}]} ir
   * @returns {[{number}, {number}]}
   */
  static irToXy(ir) {
    return this.prToXy(this.irToPr(ir));
  }

  /**
   * Convert a point in the page coordinate system to a point in the SVG
   * coordinate system.
   *
   * @param {DOMRect} svgDOMRect
   * @param {{x: {number}, y: {number}}} svgOrigin
   * @param {{clientX: {number}, clientX: {number}}} clientXY
   * @returns {{x: {number}, y: {number}}}
   */
  static clientXyToSvgXy(svgDOMRect, svgOrigin, clientXY) {
    return 0;
  }

}
