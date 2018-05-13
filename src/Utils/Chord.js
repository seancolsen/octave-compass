import IntervalSet from "./IntervalSet";
import {chords} from "../Data/chords";

export default class Chord extends IntervalSet {

  constructor(binary) {
    const chordData = chords[binary];
    if (!chordData) {
      throw "Unknown chord";
    }
    super(binary);
    this.names = [chordData.name + " chord"];
    this.symbol = chordData.symbol;
  }

}
