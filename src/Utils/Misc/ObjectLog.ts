/**
 * This class keeps a log of objects within a Map that maintains sequential
 * integers as keys.
 * 
 * @template T The type of object to store within the log
 */
export class ObjectLog<T> {

  /**
   * A javascript Map object to represents the objects logged. The keys
   * are sequential integers. The values are objects.
   */
  log: Map<number, T>;

  /**
   * This number keeps a running total of the number of objects added to
   * the log. We maintain this property so that when we add a new object to the
   * log, we can quickly compute the next sequential integer map key to use for
   * that entry. This behavior is akin to a database table primary key with
   * autoincrement.
   */
  maxKey: number;

  /**
   * If the number of logged objects reaches the integer specified here,
   * then the oldest object will be removed from the log the next time a
   * new object is added. This value is set during the initial creation of the
   * log and then it doesn't change after that.
   */
  readonly maxEntries: number;

  constructor(log = new Map<number, T>(), maxKey = 0, maxEntries = 5) {
    this.log = this.trimLog(log, maxEntries);
    this.maxKey = maxKey;
    this.maxEntries = maxEntries;
  }

  /**
   * Trim a log to the specified maximum entries and return that log.
   */
  private trimLog(log: Map<number, T>, maxEntries: number): Map<number, T> {
    const logOverflowSize = Math.max(log.size - maxEntries, 0);
    const trimmedLogEntries = [...log].slice(logOverflowSize);
    return new Map(trimmedLogEntries);
  }

  /**
   * Return a new ObjectLog with one more object added to the log.
   */
  add(...objects: T[]): ObjectLog<T> {
    let maxKey = this.maxKey;
    let newLog = new Map(this.log);
    objects.forEach(object => {
      maxKey ++;
      newLog.set(maxKey, object);
    });
    return new ObjectLog<T>(newLog, maxKey, this.maxEntries);
  }

}