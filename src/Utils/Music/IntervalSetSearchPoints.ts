import { Chord } from './Chord';
import { ChordSet } from './ChordSet';
import { IntervalSet } from './IntervalSet';
import { OrdinalChordSet } from './OrdinalChordSet';

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
pointAccumulators.push((intervalSet: IntervalSet) => 
   100 * ( 7 - Math.abs(7 - intervalSet.count))
);

/**
 * Points for chords within the scale
 */
pointAccumulators.push((intervalSet: IntervalSet) => {
  
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

export const intervalSetSearchPoints = (intervalSet: IntervalSet) =>
  pointAccumulators.reduce((sum, f) => sum + f(intervalSet), 0);
