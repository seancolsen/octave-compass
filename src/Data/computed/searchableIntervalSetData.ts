import { Chord } from '../../Utils/Music/Chord';
import { ChordSet } from '../../Utils/Music/ChordSet';
import { IntervalSet } from '../../Utils/Music/IntervalSet';
import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';

const majorChord = Chord.fromName('Major');
const minorChord = Chord.fromName('Minor');
const triads = [majorChord, minorChord];
const perfectOrdinals = [0, 5, 7];

let pointAccumulators = [] as ((is: IntervalSet) => number)[];

/** 
 * Points for being the chromatic scale
 */
pointAccumulators.push((intervalSet: IntervalSet) => 
  intervalSet.isIdenticalTo(IntervalSet.chromatic) ? 1000 : 0
)

/**
 * Points for number of notes in the scale. This makes is so that all 7-note
 * scales will appear before any scales of any other number of notes. Then all
 * 6-note and 8-note scales will appear next and so on.
 */
pointAccumulators.push((intervalSet: IntervalSet) => {
  if (!intervalSet.isScale) {
    return 0;
  }
  return 100 * ( 7 - Math.abs(7 - intervalSet.count));
});

/**
 * Points for chords within the scale
 */
pointAccumulators.push((intervalSet: IntervalSet) => {
  if (!intervalSet.isScale) return 0;
  
  const ordinalChordSets = OrdinalChordSet
    .arrayFromIntervalSet(intervalSet, ChordSet.fromAllChords);

  const triadIsPresentAtTonalCenter = ordinalChordSets
    .filter(ocs => ocs.ordinal === 0)
    .some(ocs => ocs.chordSet.containsAny(triads));

  const numberOfOrdinalsWithATriad = ordinalChordSets
    .filter(ocs => ocs.chordSet.containsAny(triads))
    .length;

  const numberOfMajorChords = ordinalChordSets
    .filter(ocs => ocs.chordSet.containsChord(majorChord))
    .length;
  
  const numberOfPerfectOrdinalsWithATriad = ordinalChordSets
    .filter(ocs => perfectOrdinals.includes(ocs.ordinal))
    .filter(ocs => ocs.chordSet.containsAny(triads))
    .length;
  
  const numberOfPerfectOrdinalsWithAMajorChord = ordinalChordSets
    .filter(ocs => perfectOrdinals.includes(ocs.ordinal))
    .filter(ocs => ocs.chordSet.containsChord(majorChord))
    .length;

  const perfectOrdinalsAllContainTheSameTriad = triads.some(chord => 
    perfectOrdinals.length === ordinalChordSets
      .filter(ocs => perfectOrdinals.includes(ocs.ordinal))
      .filter(ocs => ocs.chordSet.containsChord(chord))
      .length
  );

  return (triadIsPresentAtTonalCenter ? 10 : 0) +
    numberOfOrdinalsWithATriad +
    numberOfPerfectOrdinalsWithATriad +
    numberOfMajorChords +
    numberOfPerfectOrdinalsWithAMajorChord +
    (perfectOrdinalsAllContainTheSameTriad ? 3 : 0);
});

/**
 * Points for chords vs scales
 */
pointAccumulators.push((intervalSet: IntervalSet) => 
   intervalSet.isScale ? 7 : intervalSet.isChord ? 5 : 0
);

export function searchableIntervalSetData(intervalSets: IntervalSet[]) {

  let searchData = {} as any;
  intervalSets.forEach(intervalSet => {
    let points = pointAccumulators.reduce((Σ, f) => Σ + f(intervalSet), 0);
    // TODO I think we need to do further work to include chords
    intervalSet.scale?.names.forEach((name, index) => {
      const displayName = `${name} ${intervalSet.name.genus}`;
      searchData[displayName] = {
        searchPoints: points * (index === 0 ? 10000 : 1),
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
