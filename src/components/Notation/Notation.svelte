<script lang='ts'>
  import { Pitch } from '../../Utils/Music/Pitch';
  import { afterUpdate } from 'svelte';
  import Vex from 'vexflow';
  import { CustomMath } from "../../Utils/Math/CustomMath";
  import { getStore } from '../../store';

  const {noteSet} = getStore();
  const VF = Vex.Flow;
  const clef = 'treble';

  let container: HTMLDivElement;

  /**
   * Return an array containing one VF StaveNote for each pitch in our NoteSet.
   */
  function getStaveNotes() {

    // TODO
    const pitches = $noteSet.notes.map(note => new Pitch(note, 4));
    
    return pitches.map(pitch => {
      let staveNote = new VF.StaveNote({
        clef: clef,
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
   function staveWidth(noteCount: number) {
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
  function noteFormattingWidth(noteCount: number) {
    return CustomMath.linearInterpolate(noteCount,
      {in: 7, out: 425},
      {in: 12, out: 525}
    );
  }

  /**
   * Refresh the notation SVG
   */
  function draw() {
    // Initialize values
    const staveNotes = getStaveNotes();
    const noteCount = staveNotes.length;
    const width = staveWidth(noteCount);
    const margin = 0.04 * width;

    // If for some reason we don't have the container element, abandon.
    if (!container) {
      return;
    }

    // If the SVG already exists, remove it.
    if (container && container.firstChild) {
      container.firstChild.remove();
    }

    // Set up renderer.
    let renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    let context = renderer.getContext();

    // Set up stave.
    let stave = new VF.Stave(0, 0, width);
    stave.addClef(clef);
    stave.setContext(context).draw();

    // Add notes to stave.
    let voice = new VF.Voice({num_beats: noteCount, beat_value: 4});
    voice.addTickables(staveNotes);
    let formatter = new VF.Formatter();
    formatter.joinVoices([voice]);
    formatter.format([voice], noteFormattingWidth(noteCount));
    voice.draw(context, stave);

    // Set up SVG viewBox.
    let svg = container.firstElementChild;
    if (!svg) {
      return;
    }
    svg.setAttribute('viewBox', `${-margin} 10 ${width + 2 * margin} 95`);
  }

  afterUpdate(draw);

</script>

<div class='notation'>
  <div class='staff' bind:this={container} />
</div>

<style>
  .notation {
    max-height: 18vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    overflow: hidden;
  }
  .staff {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }
  .staff > :global(svg) {
    width: 100%;
    height: 100%;
  }
</style>
