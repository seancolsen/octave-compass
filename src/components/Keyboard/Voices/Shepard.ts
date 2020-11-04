import type { Pitch } from "../../../Utils/Music/Pitch";
import { Scalar } from "../../../Utils/Math/Scalar";
import { Midi } from "../../../Utils/Music/Midi";

export interface Props {
  envelopeCenter?: number,
  envelopeWidth?: number,
}

interface Point {
  gainValue: number;
  oscillatorFrequency: number;
}

const defaultProps = {
  envelopeCenter: 60, // (midi note)
  envelopeWidth: 5, // (octaves)
}

/**
 * The number of midi notes in one octave.
 */
const octave = 12;

export class Shepard {

  /**
   * The MIDI note number of the center point within the envelope.
   */
  envelopeCenter: number;
  
  /**
   * The width in octaves of the envelope.
   */
  envelopeWidth: number;
  
  constructor(props: Props) {
    const p = {...defaultProps, props};
    this.envelopeCenter = p.envelopeCenter;
    this.envelopeWidth = p.envelopeWidth;
  }

  /**
   * This is the envelope function that sets the volume of each octave component
   */
  gainVsMidiNote(noteNumber: number) {
    const offset = noteNumber - this.envelopeCenter;
    return Math.max(
      1 - Math.abs( 2 * offset / (this.envelopeWidth * octave) ),
      0
    );
  }

  midiNoteNumbers(pitch: Pitch) {
    const lowBound = this.envelopeCenter - this.envelopeWidth * octave / 2;
    const first = Scalar.wrap(pitch.midiNumber, lowBound, lowBound + octave);
    const keys = [...Array(this.envelopeWidth).keys()];
    return keys.map(index => first + index * octave);
  }

  points(pitch: Pitch): Point[] {
    return this.midiNoteNumbers(pitch).map(noteNumber => ({
      gainValue: this.gainVsMidiNote(noteNumber),
      oscillatorFrequency: Midi.noteNumberToFrequency(noteNumber),
    }));
  }

}
