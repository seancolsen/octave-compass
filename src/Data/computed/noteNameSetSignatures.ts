import type { IntervalSet } from "../../Utils/Music/IntervalSet";
import { maxSetSizeToName, NoteSet } from "../../Utils/Music/NoteSet";
import {musicTheory} from '../musicTheory';

const tonalCenters = [...Array(musicTheory.octaveDivisions).keys()];

export const noteNameSetSignatures = (intervalSets: IntervalSet[]) => (
  intervalSets
    .filter(is => is.isActive(0) && is.count <= maxSetSizeToName)
    .map(intervalSet => {
      const noteSets = tonalCenters.map(tonalCenter => 
        NoteSet.fromIntervalSetAndTonalCenter(intervalSet, tonalCenter).named
      );
      return [
        intervalSet.binary,
        noteSets.map(noteSet => noteSet.nameSetSignature)
      ] as [number, string[]];
    })
    .reduce((obj: any, [k, v]) => {obj[k] = v; return obj;}, {})
)
