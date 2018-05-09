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

  notes: [
    {
      sharpName: "C",
      flatName: "C",
    },
    {
      sharpName: "C sharp",
      flatName: "D flat",
    },
    {
      sharpName: "D",
      flatName: "D",
    },
    {
      sharpName: "D sharp",
      flatName: "E flat",
    },
    {
      sharpName: "E",
      flatName: "E",
    },
    {
      sharpName: "F",
      flatName: "F",
    },
    {
      sharpName: "F sharp",
      flatName: "G flat",
    },
    {
      sharpName: "G",
      flatName: "G",
    },
    {
      sharpName: "G sharp",
      flatName: "A flat",
    },
    {
      sharpName: "A",
      flatName: "A",
    },
    {
      sharpName: "A sharp",
      flatName: "B flat",
    },
    {
      sharpName: "B",
      flatName: "B",
    },
  ],

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
