/**
 * This class keeps a log of objects within a Map that maintains sequential
 * integers as keys.
 */
export default class ObjectLog {

  /**
   * A javascript Map object to represents the objects logged. The keys
   * are sequential integers. The values are objects.
   *
   * @type {Map}
   */
  log;

  /**
   * This number keeps a running total of the number of objects added to
   * the log.
   *
   * @type {int}
   */
  maxKey;

  /**
   * If the number of logged objects reaches the integer specified here,
   * then the oldest object will be removed from the log the next time a
   * new object is added.
   *
   * @type {int}
   */
  maxEntries;

  constructor(log = new Map(), maxKey = 0, maxEntries = 5) {
    this.log = ObjectLog.trimLog(log, maxEntries);
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
   * Return a new ObjectLog with one more object added to the log.
   *
   * @param objects
   * @return {ObjectLog}
   */
  add(...objects) {
    let maxKey = this.maxKey;
    let newLog = new Map(this.log);
    objects.forEach(object => {
      maxKey ++;
      newLog.set(maxKey, object);
    });
    return new ObjectLog(newLog, maxKey, this.maxEntries);
  }

}