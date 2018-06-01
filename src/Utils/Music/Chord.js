import IntervalSet from "Utils/Music/IntervalSet";
import {chordsData} from "Data/chordsData";
import IntervalSetFactory from "Utils/Music/IntervalSetFactory";

export default class Chord extends IntervalSet {

  constructor(binary) {
    const chordData = chordsData[binary];
    if (!chordData) {
      throw new Error("Unknown chord");
    }
    super(binary);
    this.names = [chordData.name];
    this.symbol = chordData.symbol;
    this.color = chordData.color;
    this.weight = chordData.weight;
    this.emblemSize = chordData.emblemSize;
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