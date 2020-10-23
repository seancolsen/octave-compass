import type { Chord } from "./Chord";
import { IntervalSetName } from "./IntervalSetName";

export class InvertedChord {

  chord: Chord;

  inversion: number;

  constructor(chord: Chord, inversion: number) {
    this.chord = chord;
    this.inversion = inversion;
  }

  get intervalSetName() {
    return new IntervalSetName({
      binary: this.chord.binary,
      baseName: this.chord.name,
      genus: 'Chord',
      inversion: this.inversion,
    });
  }

}