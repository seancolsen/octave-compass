import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export interface PaneRecordOptions {
  isInitiallyOpen?: boolean,
  isPersistent?: boolean,
}

const defaults = {
  isInitiallyOpen: false,
  isPersistent: false,
}

export class PaneRecord {

  isOpen: Writable<boolean>;

  /**
   * When false (default), the Pane will be taken out of the DOM when it's
   * closed and re-rendered when it's opened.
   *
   * When true, the pane will be kept in the DOM even when isOpen is false. The
   * Pane component will still pass isOpen to its children and they can decide
   * what to do with it. For example, they may choose to set `display: none` or
   * something similar. This is useful if you want to avoid re-rendering the
   * pane each time it's opened.
   */
  isPersistent: boolean;
  
  constructor(options: PaneRecordOptions) {
    const opts = {...defaults, ...options};
    this.isOpen = writable(opts.isInitiallyOpen);
    this.isPersistent = opts.isPersistent;
  }

}
