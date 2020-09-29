#!/usr/bin/env ts-node-script

export {};

import * as fs from 'fs';
import {IntervalSet} from '../Utils/Music/IntervalSet';
import {IntervalSetFactory} from '../Utils/Music/IntervalSetFactory';
import { NoteSet } from '../Utils/Music/NoteSet';
import {musicTheory} from './musicTheory';

const {octaveDivisions} = musicTheory;

const outputFile = `${__dirname}/computed/intervalSets.json`;

// const binaryList = [...Array(IntervalSet.chromatic.binary).keys()];
const binaryList = [2741];

const data = {} as any;
binaryList.forEach(binary => {
  const intervalSet = IntervalSetFactory.fromBinary(binary);
  const tonalCenters = [...Array(octaveDivisions).keys()];
  const noteSets = tonalCenters.map(tonalCenter => 
    NoteSet.fromIntervalSetAndTonalCenter(intervalSet, tonalCenter)
    .namedIfFeasible
  );
  const noteSetData = noteSets.map(noteSet =>
    noteSet.notes.map(note => note.name?.modifier.name)
  );
  data[binary] = {
    names: intervalSet.names,
    noteSets: noteSetData
  };
  
})

const json = JSON.stringify(data, null, 2);

fs.writeFileSync(outputFile, json);
