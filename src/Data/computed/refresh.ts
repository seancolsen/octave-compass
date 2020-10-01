#!/usr/bin/env ts-node-script

import * as fs from 'fs';
import { IntervalSet } from '../../Utils/Music/IntervalSet';
import {IntervalSetFactory} from '../../Utils/Music/IntervalSetFactory';
import {noteNameSetSignatures} from './noteNameSetSignatures';
import {searchableIntervalSetData} from './searchableIntervalSetData';

// All interval sets
const binaryList = [...Array(IntervalSet.chromatic.binary + 1).keys()];

// Some IntervalSets  uncomment this to speed up testing)
// const binaryList = [1, 145, 137, 745, 1169, 1717, 2477, 2741, 4095];

const intervalSets = binaryList.map(b => IntervalSetFactory.fromBinary(b));

const outputFile = (name: string) => `${__dirname}/output/${name}.json`;
Object.entries({
  noteNameSetSignatures: noteNameSetSignatures(intervalSets),
  searchableIntervalSetData: searchableIntervalSetData(intervalSets),
}).forEach(([name, data]: [string, any]) => {
  fs.writeFileSync(outputFile(name), JSON.stringify(data));
});
