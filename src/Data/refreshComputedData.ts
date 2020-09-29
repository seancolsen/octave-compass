#!/usr/bin/env ts-node-script

import * as fs from 'fs';
import {IntervalSetFactory} from '../Utils/Music/IntervalSetFactory';
import { NoteSet, maxSetSizeToName } from '../Utils/Music/NoteSet';
import {musicTheory} from './musicTheory';

const {octaveDivisions} = musicTheory;

const outputFile = `${__dirname}/computed/intervalSets.json`;

// const binaryList = [...Array(IntervalSet.chromatic.binary).keys()];
const binaryList = [1, 145, 137, 745, 1169, 1717, 2477, 2741, 4095];

const dataSet = {} as any;
binaryList.forEach(binary => {
  const dataPoint: any = {};
  const intervalSet = IntervalSetFactory.fromBinary(binary);
  
  if (intervalSet.type === 'scale' && intervalSet.count <= maxSetSizeToName) {
    const tonalCenters = [...Array(octaveDivisions).keys()];
    const noteSets = tonalCenters.map(tonalCenter => 
      NoteSet.fromIntervalSetAndTonalCenter(intervalSet, tonalCenter).named
    );
    dataPoint.noteNameSetSignatures = noteSets.map(ns => ns.nameSetSignature);
  }
  
  if (Object.keys(dataPoint).length > 0) {
    dataSet[binary] = dataPoint;
  }
})

const json = JSON.stringify(dataSet, null, 2);

fs.writeFileSync(outputFile, json);
