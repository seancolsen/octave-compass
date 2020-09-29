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

const searchWeights = {} as any;
intervalSets.forEach(intervalSet => {

  let points = 0;
  points += intervalSet.type === 'Chord' ? 5 : 7;

  // if (intervalSet.type === 'Scale') {
  //   const allChords = OrdinalChordSet
  //     .arrayFromIntervalSet(intervalSet, ChordSet.fromAllChords)
  //     .map(ocs => ocs.chordSet.chords.map(chord => chord.binary))
  //     .flat();
  //   const chordFrequencies = CustomMath.valueFrequency
  // }
  
  intervalSet.names.forEach(name => {
    const displayName = `${name} ${intervalSet.type}`;
    searchWeights[displayName] = points;
  });
});

const json = JSON.stringify({
  noteNameSetSignatures,
  searchWeights,
}, null, 2);


fs.writeFileSync(outputFile, json);
