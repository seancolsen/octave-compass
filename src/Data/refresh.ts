/**
 * ## HOW TO RUN THIS SCRIPT:
 * 
 * 1. In `tsconfig.json` change
 *   "module": "ESNext",
 *   to
 *   "module": "CommonJS",
 * 1. Run
 *   npm run refreshData
 * 1. Commit the json file that this script changes. DON'T COMMIT tsconfig.
 * 1. Restore tsconfig.json.
 *
 * ## WHY THE TSCONFIG CHANGE?
 * 
 * There must be a way around this! I spent a few hours on it, playing with
 * multiple tsconfig files but couldn't work it out. It would be great to fix
 * this, but we don't run this script very often, this this is how it'll stay
 * for now.
 */

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { intervalSetSearchPoints } from
  '../Utils/Music/IntervalSetSearchPoints';

const nodeModulesDir = `${__dirname}/../../node_modules/`;
const dataDir = `${nodeModulesDir}/music-theory-data/EqualTemperament/12-Tone`;

const loadEntity = (entity: 'Scales' | 'Chords') => 
  yaml.safeLoad(fs.readFileSync(`${dataDir}/${entity}.yaml`,'utf8'));

// ========================================================================== //
// Scales

// All interval sets that contain a tonal center
const max = IntervalSet.chromatic.binary;
const binaryList = [...Array((max + 1) / 2).keys()].map(i => i*2 + 1);

// Some IntervalSets  uncomment this to speed up testing)
// const binaryList = [1, 145, 137, 745, 1169, 1717, 2477, 2741, 4095];

type InputScale = {
  binary: number,
  names: {
    name: string,
    origin: string,
    citations: string[],
  }[],
};
type OutputScale = {
  binary: number,
  names?: string[],
  searchPoints?: number,
  noteNameSetSignatures?: string[],
}

const inputScales = loadEntity('Scales') as InputScale[];

const scaleNames = (binary: number) => inputScales
  .find(s => s.binary === binary)
  ?.names.map(nameObject => nameObject.name);

let outputScales = [] as OutputScale[];
binaryList.forEach(binary => {
  const names = scaleNames(binary);
  const intervalSet = IntervalSet.fromBinary(binary);
  const noteNameSetSignatures = intervalSet.noteNameSetSignatures;
  const searchPoints = intervalSetSearchPoints(intervalSet);
  if (names || noteNameSetSignatures) {
    outputScales.push({
      binary,
      names,
      noteNameSetSignatures,
      searchPoints,
    });
  }
});
outputScales = outputScales
  .sort((a, b) => (b.searchPoints || 0) - (a.searchPoints || 0));

// ========================================================================== //
// Output

const outputData = {
  scales: outputScales,
}

const outputFileName = `${__dirname}/computedData.json`;
fs.writeFileSync(outputFileName, JSON.stringify(outputData, null, 2));
