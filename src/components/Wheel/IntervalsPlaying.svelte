<script lang='ts'>
  import type { PlacedChord } from "../../Utils/Music/NoteIdSet";
  import { getStore } from "../../store";
  import GlowingText from "../common/GlowingText.svelte";
  import IntervalSetPolygon from "../common/IntervalSetPolygon.svelte";

  const {notesPlaying, noteSet, tonalCenter} = getStore();

  $: placedChords = $notesPlaying.placedChords;
  $: name = (placedChord: PlacedChord) =>
    $noteSet.noteById(placedChord.rootNoteId)?.nameToUseForLabels;
  $: placedChord = placedChords[0] as PlacedChord | undefined;
  $: intervalSet = placedChord?.chord.intervalSet
    .shift(placedChord.rootNoteId - $tonalCenter);
  $: fill = placedChords[0]?.chord?.color;

</script>

{#if placedChords && placedChords.length > 0}
  <g class='intervals-playing'>
    {#if intervalSet}
      <IntervalSetPolygon {intervalSet} radius={300} {fill} />
    {/if}
    <foreignObject x={-200} y={-300} width={400} height={600} >
      <div class='container'>
        <div class='content' >
          {#each placedChords as placedChord}
            <div class='placed-chord'>
              <div class='name'>
                <GlowingText
                  text={`${name(placedChord)} ${placedChord.chord.name} Chord`}
                  blurRadius={0}
                  glowColor='white'
                />
              </div>
              <div class='separator'>
                <GlowingText
                  text='— or —'
                  blurRadius={0}
                  glowColor='white'
                />
              </div>
            </div>
          {/each}
        </div>
      </div>
    </foreignObject>
  </g>
{/if}

<style>
  g {
    pointer-events: none;
  }
  g > :global(polygon) {
    stroke: white;
    stroke-width: 5px;
    opacity: 0.7;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: black;
  }
  .content {
    border-radius: 20px;
    padding: 10px;
    text-align: center;
  }
  .separator {
    font-style: italic;
  }
  .placed-chord:last-child .separator {
    display: none;
  }
</style>