import type { Readable } from "svelte/store";

export interface PaneController {
  isOpen: Readable<boolean>;
  isPersistent: boolean;
  close: () => void;
  open: () => void;
}