<script lang="ts">
  import { ChordSet } from '../../../Utils/Music/ChordSet';
  import { Note } from '../../../Utils/Music/Note';
  import ChordInScale from './ChordInScale.svelte';

  const constellationRadius = 270;
  const maxRadialSpacing = 5;
  const circleRadius = 45;
  const centerDeadZone = 10;

  export let chordSet: ChordSet;
  export let ordinal: number;
  export let rotation: number;
  export let note: Note | undefined = undefined;

  $: radialSpacing = (() => {
    const total = chordSet.totalEmblemSize * circleRadius * 2;
    const overShoot = constellationRadius - centerDeadZone - total;
    const spacing = overShoot / (chordSet.count - 1);
    return Math.min(spacing, maxRadialSpacing);
  })();
  $: radialPositions = (() => {
    let prevPosition = constellationRadius + radialSpacing;
    return chordSet.chords.map(chord => {
      const size = chord.emblemSize * circleRadius;
      const position = prevPosition - size + radialSpacing;
      prevPosition = position;
      return position;
    });
  })();
</script>

<g>
  {#each chordSet.chords as chord, index (index)}
  <ChordInScale
    note={note}
    radialPosition={radialPositions[index]}
    size={chord.emblemSize * circleRadius}
    chord={chord}
    interval={ordinal}
    rotation={rotation}
  />
  {/each}
  
</g>