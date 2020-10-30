import type { ChordData, NoteName } from "../Utils/Music/Chord";

export const chords: ChordData[] = [
  {
    binary: 0b000010010001,
    name: "Major",
    abbreviation: "Maj",
    weight: 1,
    textSizeFactor: 1,
    color: '#46ba19',
    contents: (noteName: NoteName) => 
      `<tspan class="bold">${noteName || ''}M</tspan>`,
  },
  {
    binary: 0b000010001001,
    name: "Minor",
    abbreviation: "min",
    weight: 2,
    textSizeFactor: 1,
    color: '#2d5da6',
    contents: (noteName: NoteName) =>
      `${noteName || ''}<tspan class="italic">m</tspan>`,
  },
  {
    binary: 0b000010100001,
    name: "Suspended 4",
    abbreviation: "Sus4",
    weight: 3,
    textSizeFactor: 1,
    color: '#1bceb1',
    contents: (noteName: NoteName) =>
      `${noteName || ''}${noteName ? 's4' : 'sus4'}`,
  },
  {
    binary: 0b000010000101,
    name: "Suspended 2",
    abbreviation: "Sus2",
    weight: 4,
    textSizeFactor: 1,
    color: '#18c0ce',
    contents: (noteName: NoteName) =>
      `${noteName || ''}${noteName ? 's2' : 'sus2'}`,
  },
  {
    binary: 0b000100010001,
    name: "Augmented",
    abbreviation: "Aug",
    weight: 5,
    textSizeFactor: 1,
    color: '#b7a18d',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan class="bold" font-size="170%" dy="-0.05em">+</tspan>',
  },
  {
    binary: 0b000001001001,
    name: "Diminished",
    abbreviation: "Dim",
    weight: 6,
    textSizeFactor: 1,
    color: '#ba5319',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan dy="-0.4em" font-size="100%">o</tspan>',
  },
  {
    binary: 0b010010010001,
    name: "Dominant 7",
    abbreviation: "Dom7",
    weight: 7,
    textSizeFactor: 1.1,
    color: '#551654',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan dy="-0.2em" font-size="90%">7</tspan>',
  },
  {
    binary: 0b100010010001,
    name: "Major 7",
    abbreviation: "Maj7",
    weight: 8,
    textSizeFactor: 1,
    color: '#9149aa',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan font-size="60%" class="bold">M</tspan>' +
      '<tspan dy="-0.4em" font-size="60%">7</tspan>',
  },
  {
    binary: 0b010010001001,
    name: "Minor 7",
    abbreviation: "min7",
    weight: 9,
    textSizeFactor: 1,
    color: '#9a6b2b',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan font-size="60%" class="italic">m</tspan>' +
      '<tspan dy="-0.4em" font-size="60%">7</tspan>',
  },
  {
    binary: 0b100010001001,
    name: "Minor-Major 7",
    abbreviation: "m/M7",
    weight: 10,
    textSizeFactor: 0.7,
    color: '#85800c',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan class="italic">m</tspan>' +
      '<tspan dy="-0.5em" font-size="70%">M7</tspan>',
  },
  {
    binary: 0b001010001001,
    name: "Minor 6",
    abbreviation: "min6",
    weight: 11,
    textSizeFactor: 0.8,
    color: '#9a225c',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan class="italic">m</tspan>' +
      '<tspan dy="-0.5em" font-size="70%">6</tspan>',
  },
  {
    binary: 0b010100010001,
    name: "Augmented 7",
    abbreviation: "Aug7",
    weight: 12,
    textSizeFactor: 0.8,
    color: '#8d786a',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan class="bold" font-size="110%" dy="-0.05em">+</tspan>' +
      '<tspan dy="-0.5em" font-size="80%">7</tspan>',
  },
  {
    binary: 0b100100010001,
    name: "Augmented Major 7",
    abbreviation: "Aug M7",
    weight: 13,
    textSizeFactor: 0.75,
    color: '#748d64',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan dy="-0.1em" class="bold" font-size="110%">+</tspan>' +
      '<tspan dy="-0.5em" font-size="60%">M7</tspan>',
  },
  {
    binary: 0b001001001001,
    name: "Diminished 7",
    abbreviation: "Dim7",
    weight: 14,
    textSizeFactor: 1,
    color: '#5f4f46',
    contents: (noteName: NoteName) => `${noteName || ''}` +
      '<tspan dy="-0.3em" font-size="70%">o7</tspan>',
  },
];
