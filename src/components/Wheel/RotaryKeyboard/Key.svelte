<script lang="ts">
  import KeyPolygon from './KeyPolygon.svelte';
  import KeyLabelSet from './KeyLabelSet.svelte';
  import { Note } from '../../../Utils/Music/Note';
  import { editVsPlay, tonalCenter } from '../../../store';

  export let note: Note;
  export let isActive: boolean;
  
  $: isEdit = $editVsPlay === 0;
  $: isPlay = $editVsPlay === 1;
  $: isClickable = isActive && isPlay;
  $: interval = note.id - $tonalCenter;

</script>

<g class:isClickable class:isActive>
  {#if isActive && !isEdit}
    <KeyPolygon class='background' {interval} />
  {/if}
  <KeyLabelSet {note} {interval}
    class='key-label-highlight'
    isHighlight={true}
    opacity={isActive ? 1 - $editVsPlay : 0}
  />
  <KeyLabelSet {note} {interval}
    class='key-label'
    isHighlight={false}
    opacity={isActive ? 1 - 0.1 * $editVsPlay : 0.25}
  />
</g>

<style>
  g.isClickable :global(*) { cursor: pointer; }
  g > :global(.background) {
    fill: #CCC;
    stroke: #a7a7a7;
    stroke-width: 3px;
  }
</style>