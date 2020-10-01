import { ChordSet } from '../../Utils/Music/ChordSet';
import type { IntervalSet } from '../../Utils/Music/IntervalSet';
import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';

let pointAccumulators = [] as ((is: IntervalSet) => number)[];

/**
 * Points for chords vs scales
 */
pointAccumulators.push((intervalSet: IntervalSet) => 
  ({'Scale': 7, 'Chord': 5, '': 0})[intervalSet.type ?? '']
);

/**
 * Points for chords within scale, with additional points if the chord lies at
 * the  tonal center or the perfect fourth or perfect fifth.
 */
pointAccumulators.push((intervalSet: IntervalSet) => {
  let points = 0;
  if (intervalSet.type !== 'Scale') {
    return points;
  }
  const ordinalChordSets = OrdinalChordSet
    .arrayFromIntervalSet(intervalSet, ChordSet.fromAllChords);
  ordinalChordSets.forEach(ordinalChordSet => {
    const ordinal = ordinalChordSet.ordinal;
    ordinalChordSet.chordSet.chords.forEach(chord => {
      const ordinalFactor = ({'0': 10, '5': 2, '7': 2} as any)[ordinal] ?? 1;
      const chordPoints = ({'145': 3, '137': 2} as any)[chord.binary] ?? 0;
      points += ordinalFactor * chordPoints;
    });
  });
  return points;
});

/**
 * Points for number of notes in the scale. This makes is so that all 7-note
 * scales will appear before any scales of any other number of notes. Then all
 * 6-note and 8-note scales will appear next and so on.
 */
pointAccumulators.push((intervalSet: IntervalSet) => {
  if (intervalSet.type !== 'Scale') {
    return 0;
  }
  return 100 * ( 7 - Math.abs(7 - intervalSet.count));
});

export function searchableIntervalSetData(intervalSets: IntervalSet[]) {

  let searchData = {} as any;
  intervalSets.forEach(intervalSet => {
    let points = pointAccumulators.reduce((Σ, f) => Σ + f(intervalSet), 0);
    intervalSet.names.forEach(name => {
      const displayName = `${name} ${intervalSet.type}`;
      searchData[displayName] = {
        searchPoints: points,
        intervalSetBinary: intervalSet.binary,
      };
    });
  });

  // Return sorted with highest points first so that we don't need to sort the
  // search results presented to the user.
  return Object.entries(searchData)
    .sort((e1: any, e2: any) => e2[1].searchPoints - e1[1].searchPoints)
    .map(([displayName, data]: any) => [displayName, data.intervalSetBinary])
    .reduce((obj: any, [k, v]) => {obj[k] = v; return obj;}, {});
}
