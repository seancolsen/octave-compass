import React, { Component } from 'react';
import Vex from 'vexflow';
import { CustomMath } from "../Utils/Math/CustomMath";
import { PitchSet } from '../Utils/Music/PitchSet';

const VF = Vex.Flow;

interface Props {
  pitchSet: PitchSet;
  clef: string;
  className?: string;
}

export class Notation extends Component<Props> {

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  /**
   * Return an array containing one VF StaveNote for each pitch in our NoteSet
   */
  staveNotes() {
    return this.props.pitchSet.pitches.map(pitch => {
      let staveNote = new VF.StaveNote({
        clef: this.props.clef,
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
   * Determine the optimal width (in SVG user space units) of the stave. VexFlow
   * does squish the notes together *somewhat*, but we want to make the stave
   * wider as well so that the spacing between notes looks good.
   */
  static staveWidth(noteCount: number) {
    return CustomMath.linearInterpolate(noteCount,
      {in: 7, out: 450},
      {in: 12, out: 550}
    );
  }

  /**
   * Determine the optimal width (in SVG user space units) of the group of
   * notes on the stave. It seems like VexFlow doesn't do a very good job at
   * listening to the width we specify in `VF.Formatter().format()`. Sometimes
   * the notes are spaced out too far apart, particularly if they have
   * accidentals. This function tries to squish them together better.
   */
  static noteFormattingWidth(noteCount: number) {
    return CustomMath.linearInterpolate(noteCount,
      {in: 7, out: 425},
      {in: 12, out: 525}
    );
  }

  /**
   * Refresh the notation SVG
   */
  draw() {
    // Initialize values
    let containingDiv = document.getElementById("notation");
    const staveNotes = this.staveNotes();
    const noteCount = staveNotes.length;
    const width = Notation.staveWidth(noteCount);
    const margin = 0.04 * width;

    // If for some reason we don't have the SVG element, abandon
    if (!containingDiv) {
      return;
    }

    // If the SVG already exists, remove it
    if (containingDiv && containingDiv.firstChild) {
      containingDiv.firstChild.remove();
    }

    // Set up renderer
    // @ts-ignore because https://github.com/DefinitelyTyped/DefinitelyTyped/issues/39079
    let renderer = new VF.Renderer(containingDiv, VF.Renderer.Backends.SVG);
    let context = renderer.getContext();

    // Set up stave
    let stave = new VF.Stave(0, 0, width);
    stave.addClef(this.props.clef);
    stave.setContext(context).draw();

    // Add notes to stave
    let voice = new VF.Voice({num_beats: noteCount, beat_value: 4});
    voice.addTickables(staveNotes);
    let formatter = new VF.Formatter();
    formatter.joinVoices([voice]);
    formatter.format([voice], Notation.noteFormattingWidth(noteCount));
    voice.draw(context, stave);

    // Set up SVG viewBox
    let svg = containingDiv.firstElementChild;
    if (!svg) {
      return;
    }
    svg.setAttribute('viewBox', `${-margin} 10 ${width + 2 * margin} 95`);
  }

  render() {
    return (
      <div id='notation' className={this.props.className}/>
    );
  }

}
