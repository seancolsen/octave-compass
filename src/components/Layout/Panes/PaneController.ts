import type { Readable } from "svelte/store";

export interface PaneController {
  isOpen: Readable<boolean>;
  close: () => void;
  open: () => void;
}
