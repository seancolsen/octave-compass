<script lang="ts">
  import type { Chord } from '../../../Utils/Music/Chord';
  import { IrPoint } from '../../../Utils/Geometry/IrPoint';
  import { Note } from '../../../Utils/Music/Note';
  import ChordEmblem from '../../common/ChordEmblem.svelte';
  import Key from '../../Keyboard/Key.svelte';
  import { Scalar } from '../../../Utils/Math/Scalar';
  import {getStore} from '../../../store';
  const {
    editVsPlay,
    somethingIsRotating,
    scaleRotator,
    createKeyController,
  } = getStore();
  const {rotation} = scaleRotator;

  export let interval: number;
  export let note: Note | undefined = undefined;
  export let chord: Chord;
  export let radialPosition: number;
  export let size: number;

  $: notes = chord.intervalSet.ordinals.map(ordinal => 
    new Note(Scalar.wrapToOctave(ordinal + (note?.id || 0)))
  );
  $: keyController = createKeyController({notes});
  $: displayNoteName = !$somethingIsRotating;
  $: noteName = displayNoteName ? (note?.name?.unicode || '') : undefined;
  $: transform = (() => {
    const {x, y} = new IrPoint(interval, radialPosition).toXy();
    return `translate(${x} ${y})`;
  })();
  $: isClickable = $editVsPlay === 1;
  $: strokeWidth = Scalar.interpolate($editVsPlay, [0, 1], [15, 5]);

</script>

<g class:isClickable {transform} class='chord-in-scale' >
  <!-- 
    This "background" circle is here and filled solid because the chord
    emblem becomes translucent during editing and needs a background to
    separate it from the other emblems.
  -->
  <circle class='background' cx={0} cy={0} r={size} stroke-width={strokeWidth}/>
  <ChordEmblem {size} {chord} {noteName} rotation={$rotation}
    opacity={1 - 0.2*(1-$editVsPlay)}
  />
  {#if isClickable}
    <Key controller={keyController} isInsideSvg={true}>
      <circle class='touch-receptor' cx={0} cy={0} r={size} />
    </Key>
  {/if}
</g>

<style>
  g > :global(.background) {
    stroke: #EEE;
    fill: #EEE;
  }
  g.isClickable > :global(.background) {
    stroke: #ddd;
    fill: #ddd;
  }
  g :global(.touch-receptor) {
    stroke-width: 15px;
  }
  g :global(.touch-receptor) {
    visibility: hidden;
  }

  /**
   * Ignore pointer events in order to prevent funny touch behaviors when
   * rotating the scale.
   * Why put this here instead of within ChordEmblem? Because that would mess up
   * the chord emblems that display within the chord table.
   */
  g > :global(.chord-emblem) {
    pointer-events: none;
  }
</style>