<script lang="ts">
  import SliceOfChords from './SliceOfChords.svelte';
  import type { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
  import {getStore} from '../../../store';
  const {intervalSet, noteSet} = getStore();

  export let ordinalChordSets: OrdinalChordSet[];

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
    />
  {/each}
</g>

