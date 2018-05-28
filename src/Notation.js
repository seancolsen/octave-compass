import React, {Component} from 'react';
import styled from 'styled-components';
import Vex from 'vexflow';

class Notation extends Component {

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }


  draw() {
    const VF = Vex.Flow;
    let div = document.getElementById("notation");
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

    const noteNames = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    const pitches = noteNames.map(noteName => `${noteName}/${octave}`);
    pitches.push(`${noteNames[0]}/5`);
    const staveNotes = pitches.map(pitch =>
      new VF.StaveNote({clef: clef, keys: [pitch], duration: 'q'})
    );
    let voice = new VF.Voice({num_beats: pitches.length, beat_value: 4});
    voice.addTickables(staveNotes);
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
  }

  render() {
    return (
      <div id='notation' className={this.props.className}/>
    );
  }
}

export default styled(Notation)`
  background: white;
`;
