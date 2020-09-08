<script lang="ts">
  import KeyPolygon from './common/KeyPolygon.svelte';
  import KeyLabelSet from './KeyLabelSet.svelte';
  import { Pitch } from '../../../Utils/Music/Pitch';
  import { editVsPlay } from '../../../store';

  export let pitch: Pitch;
  export let isActive: boolean;
  export let rotation: number;
  
  $: isEdit = $editVsPlay === 0;
  $: isPlay = $editVsPlay === 1;
  $: isClickable = isActive && isPlay;
  $: isHighlighted = isActive && isEdit;

  // const handleMouseDownOrTouchStart = (event: GenericEvent) => {
  //   event.preventDefault();
  //   if (!isActive) {
  //     return;
  //   }
  //   // store.playNotes([pitch.note.id]); // TODO
  //   event.stopPropagation();
  // }

  // TODO: add these event handlers and edit
  // onMouseDown={isClickable ? handleMouseDownOrTouchStart : undefined}
  // onTouchStart={isClickable ? handleMouseDownOrTouchStart : undefined}
  // onTouchEnd={isClickable ? e => e.preventDefault() : undefined}

</script>

  
<g
  class:isClickable
  class:isHighlighted
  class:isPlay
  class:isActive
>
  {#if isActive || isEdit}
    <KeyPolygon class='background' pitch={pitch} />
  {/if}
  {#if isHighlighted}
    <KeyLabelSet
      pitch={pitch}
      rotation={rotation}
      isHighlight={true}
    />
  {/if}
  <KeyLabelSet
    class='key-label-set'
    pitch={pitch}
    rotation={rotation}
    isHighlight={false}
  />
</g>

<style>
  g.isClickable :global(*) { cursor: pointer; }
  g > :global(.background) {
    fill: #b7b7b7;
    stroke: #a7a7a7;
    stroke-width: 3px;
  }
  g.isPlay > :global(.background) { fill: #CCC; }
  g               > :global(.key-label-set) { opacity: 0.25; }
  g.isActive      > :global(.key-label-set) { opacity: 1; }
  g.isHighlighted > :global(.key-label-set) { opacity: 0.9; }
</style>