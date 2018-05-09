/**
 * This file stores data about the names of certain things in music theory.
 *
 * We use binary numbers to refer to sets of notes. These binary numbers are
 * "big-endian", which might be counter-intuitive, depending on how you choose
 * to think about it. See 'Utils/IntervalSet.js' for a more comprehensive
 * description of how these binary numbers work.
 *
 */

export const musicTheory = {

  octaveDivisions: 12,

  notes: {
    0: {
      names: {
        natural: "C",
        sharp: "B",
        doubleFlat: "D",
      }
    },
    1: {
      names: {
        sharp: "C",
        flat: "D",
        doubleSharp: "B",
      }
    },
    2: {
      names: {
        natural: "D",
        doubleSharp: "C",
        doubleFlat: "E",
      }
    },
    3: {
      names: {
        sharp: "D",
        flat: "E",
        doubleFlat: "F",
      }
    },
    4: {
      names: {
        natural: "E",
        flat: "F",
        doubleSharp: "D",
      }
    },
    5: {
      names: {
        natural: "F",
        sharp: "E",
        doubleFlat: "G",
      }
    },
    6: {
      names: {
        sharp: "F",
        flat: "G",
        doubleSharp: "E",
      }
    },
    7: {
      names: {
        natural: "G",
        doubleSharp: "F",
        doubleFlat: "A",
      }
    },
    8: {
      names: {
        sharp: "G",
        flat: "A",
      }
    },
    9: {
      names: {
        natural: "A",
        doubleSharp: "G",
        doubleFlat: "B",
      }
    },
    10: {
      names: {
        sharp: "A",
        flat: "B",
        doubleFlat: "C",
      }
    },
    11: {
      names: {
        natural: "B",
        flat: "C",
        doubleSharp: "A",
      }
    },
  },

  intervals: [
    "tonal center",
    "minor 2",
    "major 2",
    "minor 3",
    "major 3",
    "perfect 4",
    "tritone",
    "perfect 5",
    "minor 6",
    "major 6",
    "minor 7",
    "major 7",
  ],

  chords: {
    0b000010010001: {
      name: "major",
      symbol: "<strong>M</strong>",
    },
    0b000010001001: {
      name: "minor",
      symbol: "<em>m</em>",
    },
    0b010010010001: {
      name: "dominant 7",
      symbol: "7",
    },
    0b100010010001: {
      name: "major 7",
      symbol: "M<sup>7</sup>",
    },
    0b010010001001: {
      name: "minor 7",
      symbol: "<em>m</em><sup>7</sup>",
    },
  },

  scales: {
    0b101010110101: "Major scale / Ionian mode",
    0b010110101101: "Natural minor scale / Aeolian mode",
    0b011010110101: "Mixolydian mode",
    0b011010101101: "Dorian mode",
    0b010110101011: "Phrygian mode",
    0b101011010101: "Lydian mode",
    0b010101101011: "Locrian mode",

    0b100110101101: "Harmonic minor",
  },

};
