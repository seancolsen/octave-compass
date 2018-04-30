export const musicTheory = {

  octaveDivisions: 12,

  notes: [
    {
      sharpName: "C",
      flatName: "C",
      useNames: "flat",
    },
    {
      sharpName: "C sharp",
      flatName: "D flat",
      useNames: "flat",
    },
    {
      sharpName: "D",
      flatName: "D",
      useNames: "sharp",
    },
    {
      sharpName: "D sharp",
      flatName: "E flat",
      useNames: "flat",
    },
    {
      sharpName: "E",
      flatName: "E",
      useNames: "sharp",
    },
    {
      sharpName: "F",
      flatName: "F",
      useNames: "flat",
    },
    {
      sharpName: "F sharp",
      flatName: "G flat",
      useNames: "flat",
    },
    {
      sharpName: "G",
      flatName: "G",
      useNames: "sharp",
    },
    {
      sharpName: "G sharp",
      flatName: "A flat",
      useNames: "flat",
    },
    {
      sharpName: "A",
      flatName: "A",
      useNames: "sharp",
    },
    {
      sharpName: "A sharp",
      flatName: "B flat",
      useNames: "flat",
    },
    {
      sharpName: "B",
      flatName: "B",
      useNames: "sharp",
    },
  ],

  intervals: {
    0: "tonal center",
    1: "minor 2",
    2: "major 2",
    3: "minor 3",
    4: "major 3",
    5: "perfect 4",
    6: "tritone",
    7: "perfect 5",
    8: "minor 6",
    9: "major 6",
    10: "minor 7",
    11: "major 7",
  },

  chords: {
    0b00010010000: {
      name: "major",
      symbol: "<strong>M</strong>",
    },
    0b00100010000: {
      name: "minor",
      symbol: "<em>m</em>",
    },
    0b00010010010: {
      name: "dominant 7",
      symbol: "7",
    },
    0b00010010001: {
      name: "major 7",
      symbol: "M<sup>7</sup>",
    },
    0b00100010010: {
      name: "minor 7",
      symbol: "<em>m</em><sup>7</sup>",
    },
  },

  scales: {
    0b01011010101: "Major scale / Ionian mode",
    0b01101011010: "Natural minor scale / Aeolian mode",
    0b01011010110: "Mixolydian mode",
    0b01101010110: "Dorian mode",
    0b10101011010: "Phrygian mode",
    0b01010110101: "Lydian mode",
    0b10101101010: "Locrian mode",

    0b01101011001: "Harmonic minor",
  },

};
