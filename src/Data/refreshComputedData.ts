#!/usr/bin/env ts-node-script

import * as fs from 'fs';
import { CustomMath } from '../Utils/Math/CustomMath';
import { ChordSet } from '../Utils/Music/ChordSet';
import {IntervalSetFactory} from '../Utils/Music/IntervalSetFactory';
import { NoteSet, maxSetSizeToName } from '../Utils/Music/NoteSet';
import { OrdinalChordSet } from '../Utils/Music/OrdinalChordSet';
import {musicTheory} from './musicTheory';

const {octaveDivisions} = musicTheory;

const outputFile = `${__dirname}/computed/intervalSets.json`;

// const binaryList = [...Array(IntervalSet.chromatic.binary).keys()];
const binaryList = [1, 145, 137, 745, 1169, 1717, 2477, 2741, 4095];
const intervalSets = binaryList.map(binary => 
  IntervalSetFactory.fromBinary(binary)
);
const tonalCenters = [...Array(octaveDivisions).keys()];

// ========================================================================== //

const noteNameSetSignatures = {} as any;
intervalSets.forEach(intervalSet => {
  if (intervalSet.type === 'Scale' && intervalSet.count <= maxSetSizeToName) {
    const noteSets = tonalCenters.map(tonalCenter => 
      NoteSet.fromIntervalSetAndTonalCenter(intervalSet, tonalCenter).named
    );
    noteNameSetSignatures[intervalSet.binary] = noteSets.map(noteSet => 
      noteSet.nameSetSignature
    );
  }
});

// ========================================================================== //

const searchWeightData = {} as any;
intervalSets.forEach(intervalSet => {

  let points = 0;

  // Points for chords vs scales
  points += ({'Scale': 7, 'Chord': 5, '': 0})[intervalSet.type ?? ''];

  // Points for chords within scale, with additional points if the chord lies
  // at the  tonal center or the perfect fourth or perfect fifth.
  if (intervalSet.type === 'Scale') {
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
  }

  // Points for number of notes in the scale. This makes is so that all 7-note
  // scales will appear before any scales of any other number of notes. Then
  // all 6-note and 8-note scales will appear next and so on.
  if (intervalSet.type === 'Scale') {
    points += 100 * ( 7 - Math.abs(7 - intervalSet.count));
  }
  
  intervalSet.names.forEach(name => {
    const displayName = `${name} ${intervalSet.type}`;
    searchWeightData[displayName] = {
      points: points,
      intervalSetBinary: intervalSet.binary
    };
  });
});
const searchWeights = {} as any;
Object.entries(searchWeightData)
  .sort((e1: any, e2: any) => e2[1].points - e1[1].points)
  .forEach(([displayName, data]: any) => {
    searchWeights[displayName] = data.intervalSetBinary;
  })

// ========================================================================== //

const json = JSON.stringify({
  noteNameSetSignatures,
  searchWeights,
}, null, 2);

fs.writeFileSync(outputFile, json);
