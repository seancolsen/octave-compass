import IntervalSet from "./IntervalSet";
import {scales} from "../Data/scales";

export default class Scale extends IntervalSet {

  constructor(binary) {
    const scaleData = scales[binary];
    if (!scaleData) {
      throw "Unknown scale";
    }
    super(binary);
    this.names = scaleData || [];
  }


}
