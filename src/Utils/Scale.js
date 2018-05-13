import IntervalSet from "./IntervalSet";
import {allScales} from "../Data/allScales";

export default class Scale extends IntervalSet {

  constructor(binary) {
    const scaleData = allScales[binary];
    if (!scaleData) {
      throw "Unknown scale";
    }
    super(binary);
    this.names = scaleData || [];
  }


}
