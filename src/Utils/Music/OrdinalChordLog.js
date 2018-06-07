/**
 * This class keeps a log of OrdinalChords, and it's used to keep track of the
 * ChordPolygons that we display within the scale. Each ChordPolygon needs to
 * have a unique `key` property (because that's how React works), and this class
 * keeps track of those keys using a javascript Map object in the `log` property
 * here.
 */
export default class OrdinalChordLog {

  /**
   * A javascript Map object to represents the OrdinalChords logged. The keys
   * are sequential integers. The values are OrdinalChords.
   *
   * @type {Map}
   */
  log;

  /**
   * This number keeps a running total of the number of OrdinalChords added to
   * the log.
   *
   * @type {int}
   */
  maxKey;

  /**
   * If the number of logged OrdinalChords reaches the integer specified here,
   * then the oldest OrdinalChord will be removed from the log the next time a
   * new OrdinalChord is added.
   *
   * @type {int}
   */
  maxEntries;

  constructor(log = new Map(), maxKey = 0, maxEntries = 5) {
    this.log = OrdinalChordLog.trimLog(log, maxEntries);
    this.maxKey = maxKey;
    this.maxEntries = maxEntries;
  }

  /**
   * Trim a log to the specified maximum entries and return that log.
   *
   * @param {Map} log
   * @param {int} maxEntries
   * @return {Map}
   */
  static trimLog(log, maxEntries) {
    const logOverflowSize = Math.max(log.size - maxEntries, 0);
    const trimmedLogEntries = [...log].slice(logOverflowSize);
    return new Map(trimmedLogEntries);
  }

  /**
   * Return a new OrdinalChordLog with one more OrdinalChord added to the log.
   *
   * @param {OrdinalChord} ordinalChord
   * @return {OrdinalChordLog}
   */
  add(ordinalChord) {
    const maxKey = this.maxKey + 1;
    let newLog = new Map(this.log);
    newLog.set(maxKey, ordinalChord);
    return new OrdinalChordLog(newLog, maxKey, this.maxEntries);
  }

}
