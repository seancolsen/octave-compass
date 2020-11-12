<script lang="ts">
  import type { Chord } from "../../Utils/Music/Chord";
  import ChordEmblem from '../common/ChordEmblem.svelte';
  import { Note } from "../../Utils/Music/Note";
  import StandaloneKey from "../Keyboard/StandaloneKey.svelte";
  import { Scalar } from "../../Utils/Math/Scalar";
  import { getStore } from "../../store";
  const {createKeyController} = getStore();

  export let chord: Chord;
  export let note: Note | undefined;

  const iconSize = 100;
  
  $: noteName = note?.guaranteedName.unicode;
  $: keyController = (() => {
    if (!note) {return undefined;}
    const rootNoteId = note.id;
    const notes = chord.intervalSet.ordinals.map(ordinal => 
      new Note(Scalar.wrapToOctave(rootNoteId + ordinal))
    );
    return createKeyController({notes})
  })();
</script>

<svg
  on:click
  viewBox={`-${iconSize / 2} -${iconSize / 2} ${iconSize} ${iconSize}`}
  width='2em'
  height='2em'
>
  {#if keyController}
    <StandaloneKey controller={keyController}>
      <ChordEmblem size={iconSize / 2} {chord} {noteName} />
    </StandaloneKey>
  {:else}
    <ChordEmblem size={iconSize / 2} {chord} {noteName} />
  {/if}

</svg>
