import IntervalSet from "Utils/IntervalSet";
import {allScales} from "Data/allScales";

export default class Scale extends IntervalSet {

  constructor(binary) {
    const scaleData = allScales[binary] || [];
    if (scaleData.length < 1) {
      throw new Error("Unknown scale");
    }
    super(binary);
    this.names = scaleData;
    this.defaultName = scaleData[0];
    this.alternateNames = scaleData.slice(1);
  }

}
