import { derived } from "svelte/store";
import type { PaneController } from "./PaneController";
import { PaneRecord } from "./PaneRecord";
import type { PaneRecordOptions } from "./PaneRecord";

interface Options {
  canBeEmpty?: boolean,
  canOpenMultiple?: boolean,
}

const defaults = {
  canBeEmpty: false,
  canOpenMultiple: false,
}

export class PaneAreaController {

  /**
   * When true, this PaneAreaController will be able to close all Panes, leaving
   * an empty area. A modal dialog would use `true` here, while a tab display
   * would use false.
   */
  canBeEmpty: boolean;

  /**
   * When true, this PaneAreaController will be able to open multiple Panes
   * within the same area. For example, a modal dialog on top of a modal dialog.
   */
  canOpenMultiple: boolean;

  paneRecords: PaneRecord[];

  /**
   * We could compute the open records by checking each record to see if
   * it's open, but we keep this list as a cache too, to improve performance.
   */
  // openedPaneRecords: PaneRecord[];

  constructor(options: Options = {}) {
    const opts = {...defaults, ...options};
    this.canBeEmpty = opts.canBeEmpty;
    this.canOpenMultiple = opts.canOpenMultiple;
    this.paneRecords = [] as PaneRecord[];
  }

  addPane(options = {} as PaneRecordOptions): PaneController {
    const record = new PaneRecord(options);
    this.paneRecords = [...this.paneRecords, record];
    return {
      isOpen: derived(record.isOpen, o => o),
      isPersistent: record.isPersistent,
      close: this.closePane(record),
      open: this.openPane(record),
    };
  }

  private openPane(paneRecord: PaneRecord) {
    if (this.canOpenMultiple) {
      return () => paneRecord.isOpen.set(true);
    }
    return () => {
      this.closeAllOpenPanes();
      paneRecord.isOpen.set(true);
    }
  }

  private closePane(paneRecord: PaneRecord) {
    return this.canBeEmpty ? () => paneRecord.isOpen.set(false) : () => {};
  }

  closeAllOpenPanes() {
    this.paneRecords.forEach(record => record.isOpen.set(false));
  }

}
