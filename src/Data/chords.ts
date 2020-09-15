type NoteName = string | undefined;
export type ChordContents = (noteName: NoteName) => string

export interface ChordData {
  binary: number;
  name: string;
  weight: number;
  emblemSize: number;
  textSizeFactor: number;
  color: string;
  contents: ChordContents;
  inversion?: number | null | undefined;
}

export const chords: ChordData[] = [
  {
    binary: 0b000010010001,
    name: "major",
    weight: 1,
    emblemSize: 1,
    textSizeFactor: 1,
    color: '#46ba19',
    contents: (noteName: NoteName) => 
      `<tspan class="bold">${noteName || ''}M</tspan>`,
  },
  {
    binary: 0b000010001001,
    name: "minor",
    weight: 2,
    emblemSize: 0.9,
    textSizeFactor: 1,
    color: '#2d5da6',
    contents: (noteName: NoteName) =>
      `${noteName || ''}<tspan class="italic">m</tspan>`,
  },
  {
    binary: 0b000010000101,
    name: "suspended 2",
    weight: 3,
    emblemSize: 0.7,
    textSizeFactor: 1,
    color: '#18c0ce',
    contents: (noteName: NoteName) =>
      `${noteName || ''}${noteName ? 's2' : 'sus2'}`,
  },
  {
    binary: 0b000010100001,
    name: "suspended 4",
    weight: 4,
    emblemSize: 0.7,
    textSizeFactor: 1,
    color: '#1bceb1',
    contents: (noteName: NoteName) =>
      `${noteName || ''}${noteName ? 's4' : 'sus4'}`,
  },
  {
    binary: 0b000100010001,
    name: "augmented",
    weight: 5,
    emblemSize: 0.7,
    textSizeFactor: 1,
    color: '#b7a18d',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan class="bold" fontSize="170%" dy="-0.05em">+</tspan>
    `,
  },
  {
    binary: 0b000001001001,
    name: "diminished",
    weight: 6,
    emblemSize: 0.7,
    textSizeFactor: 1,
    color: '#ba5319',
    contents: (noteName: NoteName) =>
      `${noteName || ''}<tspan dy="-0.4em" fontSize="100%">o</tspan>`,
  },
  {
    binary: 0b010010010001,
    name: "dominant 7",
    weight: 7,
    emblemSize: 0.7,
    textSizeFactor: 1.1,
    color: '#551654',
    contents: (noteName: NoteName) =>
      `${noteName || ''}<tspan dy="-0.2em" fontSize="90%">7</tspan>`,
  },
  {
    binary: 0b100010010001,
    name: "major 7",
    weight: 8,
    emblemSize: 0.9,
    textSizeFactor: 1,
    color: '#9149aa',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan fontSize="60%" class='bold'>M</tspan>
      <tspan dy="-0.4em" fontSize="60%">7</tspan>
    `,
  },
  {
    binary: 0b010010001001,
    name: "minor 7",
    weight: 9,
    emblemSize: 0.9,
    textSizeFactor: 1,
    color: '#9a6b2b',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan fontSize="60%" class="italic">m</tspan>
      <tspan dy="-0.4em" fontSize="60%">7</tspan>
    `,
  },
  {
    binary: 0b100010001001,
    name: "minor-major 7",
    weight: 10,
    emblemSize: 1,
    textSizeFactor: 0.7,
    color: '#85800c',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan class="italic">m</tspan>
      <tspan dy="-0.5em" fontSize="70%">M7</tspan>
    `,
  },
  {
    binary: 0b001010001001,
    name: "minor 6",
    weight: 11,
    emblemSize: 0.8,
    textSizeFactor: 0.9,
    color: '#9a225c',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan class="italic">m</tspan>
      <tspan dy="-0.5em" fontSize="70%">6</tspan>
    `,
  },
  {
    binary: 0b010100010001,
    name: "augmented 7",
    weight: 12,
    emblemSize: 0.9,
    textSizeFactor: 0.85,
    color: '#8d786a',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan class="bold" fontSize="110%" dy="-0.05em">+</tspan>
      <tspan dy="-0.5em" fontSize="80%">7</tspan>
    `,
  },
  {
    binary: 0b100100010001,
    name: "augmented major 7",
    weight: 13,
    emblemSize: 0.9,
    textSizeFactor: 0.8,
    color: '#748d64',
    contents: (noteName: NoteName) => `
      ${noteName || ''}
      <tspan dy="-0.1em" class="bold" fontSize="110%">+</tspan>
      <tspan dy="-0.5em" fontSize="60%">M7</tspan>
    `,
  },
  {
    binary: 0b001001001001,
    name: "diminished 7",
    weight: 14,
    emblemSize: 0.7,
    textSizeFactor: 1,
    color: '#5f4f46',
    contents: (noteName: NoteName) =>
      `${noteName || ''}<tspan dy="-0.3em" fontSize="70%">o7</tspan>`,
  },
];
