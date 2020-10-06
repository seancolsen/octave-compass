<script lang='ts'>
  import { Angle } from "../../../Utils/Geometry/Angle";
  import type { IntervalSet } from "../../../Utils/Music/IntervalSet";
  import { IntervalSetFactory } from "../../../Utils/Music/IntervalSetFactory";

  export let intervalSet: IntervalSet;

  $: ordinalLabels = intervalSet.ordinals.map(ordinal => ({
    ordinal,
    label: IntervalSetFactory.fromIntervalSet(intervalSet.modeShift(ordinal))
      .displayName
  }))
</script>

{#each ordinalLabels as {ordinal, label}}
  <foreignObject
    x='-100'
    y='-480'
    width='200'
    height='120'
    transform={`rotate(${Angle.iToD(ordinal)})`}
  >
    <div>
      <span>{label}</span>
    </div>
  </foreignObject>
{/each}

<style>
  div {
    height: 100%;
    /* background: palegoldenrod; */
    text-align: center;
    font-size: 30px;
  }

  span {background: white;}
</style>