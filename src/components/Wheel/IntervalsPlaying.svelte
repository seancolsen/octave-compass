<script lang='ts'>
  import type { PlacedChord } from "src/Utils/Music/NoteIdSet";
  import { getStore } from "../../store";
  import GlowingText from "../common/GlowingText.svelte";
  import IntervalSetPolygon from "../common/IntervalSetPolygon.svelte";

  const {notesPlaying, noteSet, tonalCenter} = getStore();
  const box = 300;

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
    <foreignObject x={-box/2} y={-box/2} width={box} height={box} >
      <div class='container'>
        <div class='content' >
          {#each placedChords as placedChord}
            <div class='placed-chord'>
              <div class='name'>
                {name(placedChord)} {placedChord.chord.name} Chord
                <!-- <GlowingText text={``}/> -->
              </div>
              <div class='separator'>— or —</div>
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
    stroke-width: 2px;
    opacity: 0.5;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: black;
    /* font-weight: bold; */
  }
  .content {
    border-radius: 20px;
    padding: 10px;
    text-align: center;
    background: rgba(204, 204, 204, 0.4);
  }
  .name {
    /* text-shadow: -0.08em -0.08em 0 white; */
  }
  .separator {
    font-style: italic;
  }
  .placed-chord:last-child .separator {
    display: none;
  }
</style>