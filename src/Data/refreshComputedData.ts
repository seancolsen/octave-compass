#!/usr/bin/env ts-node-script

import * as fs from 'fs';
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
  const noteNameSetSignature = noteSets.map(noteSet => noteSet.nameSetSignature);
  data[binary] = {
    names: intervalSet.names,
    noteNameSetSignature: noteNameSetSignature
  };
  
})

const json = JSON.stringify(data, null, 2);

fs.writeFileSync(outputFile, json);
