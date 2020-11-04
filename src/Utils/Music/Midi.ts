export class Midi {

  static noteNumberToFrequency(noteNumber: number) {
    return 440 * Math.pow(2, (noteNumber - 69) / 12);
  }
  
  static frequencyToNoteNumber(frequency: number) {
    return 33 + (12 * Math.log(frequency / 55)) / Math.log(2);
  }

}