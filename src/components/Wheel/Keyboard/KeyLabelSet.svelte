<script lang="ts">
  import { Pitch } from "../../../Utils/Music/Pitch";
  import Arc from "../common/Arc.svelte";
  import KeyLabel from './KeyLabel.svelte';
  import { editVsPlay } from '../../../store';

  const tieSpan = 0.2;

  let className: string | undefined = undefined;
  export {className as class};
  export let pitch: Pitch;
  export let rotation: number;
  /**
   * True when we're rendering the blurred yellow highlight that goes behind the
   * actual labels.
   */
  export let isHighlight: boolean;

  $: names = pitch.note.namesToUseForLabels;
  $: radius = 348 + $editVsPlay * 20;
  $: color = isHighlight ? '#fffa58' : pitch.note.color;
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
>
  {#if names.length > 1}
    <Arc
      class='label-tie'
      startInterval={pitch.note.id - tieSpan}
      endInterval={pitch.note.id + tieSpan}
      color={color}
      radius={radius}
    />
  {/if}
  {#each names as name, index (name.ascii)}
    <KeyLabel
      radius={radius}
      interval={pitch.note.id + keyLabelIntervalOffset(index)}
      rotation={rotation}
      color={color}
      isParenthetical={names.length > 1 && name.modifier.name === 'natural'}
      strokeWidth={isHighlight ? 35 : 0}
    >
      {#if !isHighlight}{name.unicode}{/if}
    </KeyLabel>
  {/each}
</g>

<style>
  g :global(.label-tie) {stroke-width: 50px;}
</style>
