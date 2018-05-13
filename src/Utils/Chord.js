import IntervalSet from "./IntervalSet";
import {chordsData} from "../Data/chordsData";
import IntervalSetFactory from "./IntervalSetFactory";

export default class Chord extends IntervalSet {

  constructor(binary) {
    const chordData = chordsData[binary];
    if (!chordData) {
      throw "Unknown chord";
    }
    super(binary);
    this.names = [chordData.name];
    this.symbol = chordData.symbol;
  }

  /**
   *
   * @return {IntervalSet[]}
   */
  get inversions() {
    return this.ordinals.map(ordinal =>
      IntervalSetFactory.fromShift(this, -ordinal)
    );
  }

}
