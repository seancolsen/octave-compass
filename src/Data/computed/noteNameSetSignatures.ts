import type { IntervalSet } from "../../Utils/Music/IntervalSet";
import { maxSetSizeToName, NoteSet } from "../../Utils/Music/NoteSet";
import {musicTheory} from '../musicTheory';
import {default as data} from './output/noteNameSetSignatures.json'

interface NoteNameSetSignaturesData {
  [intervalSetBinary: string]: string[],
}

const generatedNoteNameSetSignatures = (() => {
  const result = new Map<number, string[]>();
  for (let dataPoint of Object.entries(data as NoteNameSetSignaturesData)) {
    result.set(parseInt(dataPoint[0]), dataPoint[1]);
  }
  return result;
})();

const tonalCenters = [...Array(musicTheory.octaveDivisions).keys()];

export function generateNoteNameSetSignatures(intervalSets: IntervalSet[]) {
  return intervalSets
    .filter(is => is.isActive(0) && is.count <= maxSetSizeToName)
    .map(intervalSet => {
      const noteSets = tonalCenters.map(tonalCenter => 
        NoteSet.fromIntervalSetAndTonalCenter(intervalSet, tonalCenter)
          .namedViaBruteForce
      );
      return [
        intervalSet.binary,
        noteSets.map(noteSet => noteSet.nameSetSignature)
      ] as [number, string[]];
    })
    .reduce((o: NoteNameSetSignaturesData, [k, v]) => {o[k] = v; return o;}, {})
}

export function lookupNoteNameSetSignature(
  intervalSet: IntervalSet,
  tonalCenter: number,
) {
  return generatedNoteNameSetSignatures.get(intervalSet.binary)?.[tonalCenter];
}