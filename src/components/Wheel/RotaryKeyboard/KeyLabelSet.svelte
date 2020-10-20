<script lang="ts">
  import type { Note } from "../../../Utils/Music/Note";
  import Arc from "../common/Arc.svelte";
  import KeyLabel from './KeyLabel.svelte';
  import {getStore} from '../../../store';
  const {editVsPlay} = getStore();

  const tieSpan = 0.2;

  let className = undefined as string | undefined;
  export {className as class};
  export let interval: number;
  export let note: Note;
  /**
   * True when we're rendering the blurred yellow highlight that goes behind the
   * actual labels.
   */
  export let isHighlight: boolean;
  export let opacity = 1;
  export let hasBackground = true as boolean;
  export let lightIsOn =  false as boolean;

  $: names = note.namesToUseForLabels;
  $: radius = 348 + $editVsPlay * 20;
  $: isBlack = note.color === 'black';
  $: color = isHighlight ? '#fff000' : isBlack ? '#222' : '#EEE';
  $: keyLabelIntervalOffset = (index: number) => {
    const discreteWidth = names.length - 1;
    const discreteOffset = (2 * index) - discreteWidth;
    const spread = 0.20;
    return discreteOffset * spread;
  }
</script>

<g
  class={className}
  filter={isHighlight ? "url('#blur')" : 'none'}
  {opacity}
>
  {#if names.length > 1 && hasBackground}
    <Arc {color} {radius}
      class='label-tie'
      startInterval={interval - tieSpan}
      endInterval={interval + tieSpan}
    />
  {/if}
  {#each names as name, index (name.ascii)}
    <KeyLabel {radius} {hasBackground} {color} {isBlack} {lightIsOn}
      interval={interval + keyLabelIntervalOffset(index)}
      isParenthetical={names.length > 1 && name.modifier.name === 'natural'}
      strokeWidth={isHighlight ? 35 : 0}
    >
      {#if !isHighlight}{name.unicode}{/if}
    </KeyLabel>
  {/each}
</g>

<style>
  g > :global(.label-tie) {stroke-width: 50px;}
</style>
