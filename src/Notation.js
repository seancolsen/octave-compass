import React, {Component} from 'react';
import Vex from 'vexflow';

export default class Notation extends Component {

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const VF = Vex.Flow;
    let div = document.getElementById("notation");
    if (div && div.firstChild) {
      div.firstChild.remove();
    }
    let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 100);
    let context = renderer.getContext();
    let stave = new VF.Stave(0, 0, 400);

    // TODO: Allow user to change clef
    const clef = "treble";
    stave.addClef(clef);
    const octave = 4;

    // TODO: determine appropriate key signature and set it here
    //stave.addKeySignature('Bb');

    stave.setContext(context).draw();

    const pitches = this.props.noteSet.pitchSetStartingFrom(octave).pitches;
    const staveNotes = pitches.map(pitch => {
      let staveNote = new VF.StaveNote({
        clef: clef,
        keys: [pitch.slashNotation],
        duration: 'q'
      });
      let modifier = pitch.note.guaranteedName.modifier.ascii;
      if (modifier) {
        staveNote = staveNote.addAccidental(0, new VF.Accidental(modifier));
      }
      return staveNote;
    });

    let voice = new VF.Voice({num_beats: staveNotes.length, beat_value: 4});
    voice.addTickables(staveNotes);
    new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
  }

  render() {
    return (
      <div id='notation' className={this.props.className}/>
    );
  }
}
