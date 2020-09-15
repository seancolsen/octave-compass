<script lang="ts">
  import { OrdinalChord } from '../../../Utils/Music/OrdinalChord';
  import { Chord } from '../../../Utils/Music/Chord';
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import { Note } from '../../../Utils/Music/Note';
  import ChordEmblem from '../../common/ChordEmblem.svelte';
  import { editVsPlay } from '../../../store';
  import { somethingIsRotating } from '../Wheel.svelte';

  let className: string | undefined = undefined;
  export {className as class};
  export let interval: number;
  export let note: Note | undefined = undefined;
  export let chord: Chord;
  export let radialPosition: number;
  export let size: number;

  $: displayNoteName = !$somethingIsRotating;
  $: noteName = displayNoteName ? (note?.name?.unicode || '') : undefined;
  $: transform = (() => {
    const {x, y} = new IrPoint(interval, radialPosition).toXy();
    return `translate(${x} ${y})`;
  })();
  $: isClickable = $editVsPlay === 1;

  // const handleMouseDownOrTouchStart = (event: GenericEvent) => {
  //   event.preventDefault();
  //   const ordinalChord = new OrdinalChord(
  //     interval, chord
  //   );
  //   store.playOrdinalChord(ordinalChord);
  //   event.stopPropagation();
  // }
  /**
   * TODO: add these event handlers onto the g element
  onMouseDown={isClickable ? handleMouseDownOrTouchStart : undefined}
  onTouchStart={isClickable ? handleMouseDownOrTouchStart : undefined}
  onTouchEnd={isClickable ? e => e.preventDefault() : undefined}
  */
</script>

<g class:isClickable {transform} class={className} >
  <!-- 
    -- This "background" circle is here and filled solid because the chord
    -- emblem becomes translucent during editing and needs a background to
    -- separate it from the other emblems.
    -->
  <circle class='background' cx={0} cy={0} r={size} />
  <ChordEmblem {size} {chord} {noteName} opacity={isClickable ? 1 : 0.4} />
</g>

<style>
  g > :global(.background) {
    stroke: #e1e1e1;
    stroke-width: 5px;
    fill: #e1e1e1;
  }
  g.isClickable :global(*) { cursor: pointer; }
  g.isClickable:hover > :global(.background) {
    stroke: white;
    stroke-width: 15px;
  }
</style>