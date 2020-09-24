<script lang="ts">
  import { Scalar } from '../../../Utils/Math/Scalar';
  import { ChordSet } from '../../../Utils/Music/ChordSet';
  import { Note } from '../../../Utils/Music/Note';
  import ChordInScale from './ChordInScale.svelte';
  import {getStore} from '../../../store';
  const {editVsPlay} = getStore();
  
  const circleRadius = 45;

  export let chordSet: ChordSet;
  export let ordinal: number;
  export let note: Note | undefined = undefined;

  $: constellationRadius = Scalar.interpolate($editVsPlay, [0, 1], [270, 320]);
  
  /**
   * If 0, the emblems will be stacked edge to edge. When positive, the emblems
   * will overlap by that amount. We need them to overlap more when more emblems
   * are present, so we re-calculate this value as needed.
   */
  $: overlap = (() => {
    const centerDeadZone = 30;
    const availableSpace = constellationRadius - centerDeadZone;
    const spaceNeededIfStacked = chordSet.totalEmblemSize * circleRadius * 2;
    const totalOverlap = spaceNeededIfStacked - availableSpace;
    const requiredOverlap = totalOverlap / (chordSet.count - 1);
    const minOverlap = 10; // for aesthetics with few chords
    return Math.max(minOverlap, requiredOverlap);
  })();

  /**
   * A radial position for each chord, matched by index.
   */
  $: radialPositions = (() => {
    // Place outer chords first.
    // Each radial position corresponds to the chord emblem's center.

    // Begin with an outer circle upon which the outer edge of the outer-most
    // chord will be aligned.
    let outerBound = constellationRadius;

    return chordSet.chords.map(chord => {
      const emblemRadius = chord.emblemSize * circleRadius;

      // Move from the outer edge of the emblem to the center of the emblem.
      const radialPosition = outerBound - emblemRadius;

      // Move the outer bound inwards in preparation for the next emblem.
      outerBound -= emblemRadius * 2 - overlap;
      return radialPosition;
    }).reverse(); // Reverse so that common chords display on top
  })();
</script>

<g>
  <!-- Reverse so that common chords display on top -->
  {#each chordSet.chords.reverse() as chord, index}
  <ChordInScale
    {note}
    radialPosition={radialPositions[index]}
    size={chord.emblemSize * circleRadius}
    {chord}
    interval={ordinal}
  />
  {/each}
</g>