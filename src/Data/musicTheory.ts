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
type IntervalData = {
  longName: string,
  shortName: string,
};
type MusicTheoryData = {
  octaveDivisions: number,
  notes: NotesData,
  intervals: IntervalData[],
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
    {
      longName: "Tonal center",
      shortName: "1",
    },
    {
      longName: "Minor 2",
      shortName: "♭2",
    },
    {
      longName: "Major 2",
      shortName: "2",
    },
    {
      longName: "Minor 3",
      shortName: "♭3",
    },
    {
      longName: "Major 3",
      shortName: "3",
    },
    {
      longName: "Perfect 4",
      shortName: "4",
    },
    {
      longName: "Tritone",
      shortName: "♭5",
    },
    {
      longName: "Perfect 5",
      shortName: "5",
    },
    {
      longName: "Minor 6",
      shortName: "♭6",
    },
    {
      longName: "Major 6",
      shortName: "6",
    },
    {
      longName: "Minor 7",
      shortName: "♭7",
    },
    {
      longName: "Major 7",
      shortName: "7",
    },
  ],

};
