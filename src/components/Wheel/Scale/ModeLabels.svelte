<script lang='ts'>
  import { Angle } from "../../../Utils/Geometry/Angle";
  import type { IntervalSet } from "../../../Utils/Music/IntervalSet";
  import { IntervalSetFactory } from "../../../Utils/Music/IntervalSetFactory";

  export let intervalSet: IntervalSet;
  export let selectedOrdinal = undefined as number | undefined;

  $: ordinalLabels = intervalSet.ordinals.map(ordinal => ({
    ordinal,
    label: IntervalSetFactory.fromIntervalSet(intervalSet.shift(-ordinal))
      .displayName
  }))
</script>

{#each ordinalLabels as {ordinal, label}}
  <foreignObject
    x='-150'
    y='-650'
    width='300'
    height='220'
    transform={`rotate(${Angle.iToD(ordinal)})`}
  >
    <div class:isSelected={ordinal === selectedOrdinal}>
      {label}
    </div>
  </foreignObject>
{/each}

<style>
  div {
    height: 100%;
    padding: 50px;
    text-align: center;
    font-size: 40px;
    font-style: italic;
    color: #999;
  }
  div.isSelected {
    font-weight: bold;
    color: black;
  }
</style>