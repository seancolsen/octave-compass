import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export interface PaneRecordOptions {
  isInitiallyOpen?: boolean,
}

const defaults = {
  isInitiallyOpen: false,
}

export class PaneRecord {

  isOpen: Writable<boolean>;

  constructor(options: PaneRecordOptions) {
    const opts = {...defaults, ...options};
    this.isOpen = writable(opts.isInitiallyOpen);
  }

}
