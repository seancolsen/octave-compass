<script lang="ts">
  import KeyPolygon from './KeyPolygon.svelte';
  import KeyLabelSet from './KeyLabelSet.svelte';
  import { Note } from '../../../Utils/Music/Note';
  import Key from '../../Keyboard/Key.svelte';
  import {getStore} from '../../../store';
  import {useLight} from '../../Lighting/Light';
  const {editVsPlay, tonalCenter} = getStore();

  export let note: Note;
  export let isActive: boolean;

  const light = useLight([`note-${note.id}`]);
  
  $: isEdit = $editVsPlay === 0;
  $: isPlay = $editVsPlay === 1;
  $: isBlack = note.color === 'black';
  $: interval = note.id - $tonalCenter;

</script>

<g class:isActive class:isBlack >
  {#if isActive && !isEdit}
    <KeyPolygon class='background' {interval} />
  {/if}
  <KeyLabelSet {note} {interval}
    class='key-label-highlight'
    isHighlight={true}
    opacity={isPlay ? ($light) : (isActive ? 1 - $editVsPlay : 0)}
  />
  <KeyLabelSet {note} {interval}
    class='key-label'
    isHighlight={false}
    opacity={isActive ? 1 - 0.1 * $editVsPlay : 0.25}
    hasBackground={$editVsPlay !== 1 || !isActive}
  />
  {#if isActive && !isEdit}
    <Key
      pitches={[note.pitchAboveTonalCenterInOctave($tonalCenter, 4)]}
      isInsideSvg={true}
    >
      <KeyPolygon class='touch-receptor' {interval} />
    </Key>
  {/if}
</g>

<style>
  g > :global(.background) {
    fill: #EEE;
    stroke: #EEE;
  }
  g.isBlack > :global(.background) {
    fill: #222;
    stroke: #222;
  }
  
  g :global(.touch-receptor) {
    visibility: hidden;
    pointer-events: all;
  }
</style>