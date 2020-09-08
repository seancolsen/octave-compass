<script lang="ts">
  import SliceOfChords from './SliceOfChords.svelte';
  import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
  import {intervalSet, noteSet} from '../../../store';

  export let ordinalChordSets: OrdinalChordSet[];
  export let rotation: number;

  $: ordinals = $intervalSet.ordinals;
  $: findNote = (ordinal: number) => 
    $noteSet.notes[ordinals.findIndex(o => o === ordinal)];
</script>

<g filter="url('#shadow-when-play')">
  {#each ordinalChordSets as ordinalChordSet, index (index)}
    <SliceOfChords
      note={findNote(ordinalChordSet.ordinal)}
      chordSet={ordinalChordSet.chordSet}
      ordinal={ordinalChordSet.ordinal}
      rotation={rotation}
    />
  {/each}
</g>

