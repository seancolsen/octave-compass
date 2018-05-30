import React, {Component} from 'react';
import Vex from 'vexflow';

const VF = Vex.Flow;

export default class Notation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clef: "treble",
    };
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  /**
   * Return an array containing one VF StaveNote for each pitch in our NoteSet
   *
   * @return {StaveNote[]}
   */
  staveNotes() {
    const octave = 4;
    const pitches = this.props.noteSet.pitchSetStartingFrom(octave).pitches;
    return pitches.map(pitch => {
      let staveNote = new VF.StaveNote({
        clef: this.state.clef,
        keys: [pitch.slashNotation],
        duration: 'q',
        auto_stem: true,
      });
      let modifier = pitch.note.guaranteedName.modifier.ascii;
      if (modifier) {
        staveNote = staveNote.addAccidental(0, new VF.Accidental(modifier));
      }
      return staveNote;
    });
  }

  /**
   * Refresh the notation SVG
   */
  draw() {
    let containingDiv = document.getElementById("notation");

    // If the SVG already exists, remove it
    if (containingDiv && containingDiv.firstChild) {
      containingDiv.firstChild.remove();
    }

    // Set up renderer
    let renderer = new VF.Renderer(containingDiv, VF.Renderer.Backends.SVG);
    renderer.resize(400, 100);
    let context = renderer.getContext();

    // Set up stave
    let stave = new VF.Stave(0, 0, 400);
    stave.addClef(this.state.clef);
    stave.setContext(context).draw();

    // Add notes to stave
    const staveNotes = this.staveNotes();
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
