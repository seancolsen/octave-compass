<script lang='ts'>
  import { Angle } from "../../../Utils/Geometry/Angle";
  import type { IntervalSet } from "../../../Utils/Music/IntervalSet";

  export let intervalSet: IntervalSet;
  export let selectedOrdinal = undefined as number | undefined;

  const boxWidth = 200;

  $: ordinalLabels = intervalSet.ordinals.map(ordinal => ({
    ordinal,
    label: intervalSet.shift(-ordinal).analyzed.name.full
  }))
</script>

{#each ordinalLabels as {ordinal, label}}
  <foreignObject
    x={-boxWidth / 2}
    y='-500'
    width={boxWidth}
    height='200'
    transform={`rotate(${Angle.iToD(ordinal)})`}
  >
    <div class='container'>
      <div class='ideal-region'>
        <div
          class='label' 
          class:isSelected={ordinal === selectedOrdinal}
        >
          {label}
        </div>
      </div>
    </div>
  </foreignObject>
{/each}

<style>
  .container {
    height: 100%;
    /* background: rgba(255, 0, 0, 0.2); */
  }
  .ideal-region {
    min-height: 100px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: center;
    overflow: visible;
    /* background: rgba(0, 255, 0, 0.2); */
  }
  .label {
    text-align: center;
    font-size: 30px;
    line-height: 1em;
    font-style: italic;
    color: #777;
    /* background: rgba(0, 0, 255, 0.2); */
  }
  .label.isSelected {
    color: black;
  }
</style>