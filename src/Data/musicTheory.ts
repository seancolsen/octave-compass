/**
 * This file stores data about the names of certain things in music theory.
 *
 * We use binary numbers to refer to sets of notes. These binary numbers are
 * "big-endian", which might be counter-intuitive, depending on how you choose
 * to think about it. See 'Utils/IntervalSet.js' for a more comprehensive
 * description of how these binary numbers work.
 *
 */

type StringMap = { [k: string]: string };
type NotesData = { [k: number]: { names: StringMap } };
type MusicTheoryData = {
  octaveDivisions: number,
  notes: NotesData,
  intervals: string[],
};

export const musicTheory: MusicTheoryData = {

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

};
