<script lang="ts">
  import { Chord } from '../../../Utils/Music/Chord';
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import { Note } from '../../../Utils/Music/Note';
  import ChordEmblem from '../../common/ChordEmblem.svelte';
  import { editVsPlay } from '../../../store';
  import { somethingIsRotating } from '../Wheel.svelte';
  import Key from '../../Keyboard/Key.svelte';
import { Scalar } from '../../../Utils/Math/Scalar';

  let className: string | undefined = undefined;
  export {className as class};
  export let interval: number;
  export let note: Note | undefined = undefined;
  export let chord: Chord;
  export let radialPosition: number;
  export let size: number;

  $: pitches = chord.ordinals.map(ordinal => {
    const noteId = Scalar.wrapToOctave(ordinal + (note?.id || 0));
    return (new Note(noteId)).pitchInOctave(4);
  });

  $: displayNoteName = !$somethingIsRotating;
  $: noteName = displayNoteName ? (note?.name?.unicode || '') : undefined;
  $: transform = (() => {
    const {x, y} = new IrPoint(interval, radialPosition).toXy();
    return `translate(${x} ${y})`;
  })();
  $: isClickable = $editVsPlay === 1;

</script>

<g class:isClickable {transform} class={className} >
  <!-- 
    This "background" circle is here and filled solid because the chord
    emblem becomes translucent during editing and needs a background to
    separate it from the other emblems.
  -->
  <circle class='background' cx={0} cy={0} r={size} />
  <ChordEmblem {size} {chord} {noteName} opacity={isClickable ? 1 : 0.4} />
  <Key {pitches} isInsideSvg={true} >
    <circle class='touch-receptor' cx={0} cy={0} r={size} />
  </Key>
</g>

<style>
  g > :global(.background) {
    stroke: #e1e1e1;
    fill: #e1e1e1;
  }
  g > :global(.background),
  g :global(.touch-receptor) {
    stroke-width: 5px;
  }
  g :global(.touch-receptor) {
    visibility: hidden;
  }
</style>