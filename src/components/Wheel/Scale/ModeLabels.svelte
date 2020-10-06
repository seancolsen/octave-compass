<script lang='ts'>
  import { Angle } from "../../../Utils/Geometry/Angle";
  import type { IntervalSet } from "../../../Utils/Music/IntervalSet";
  import { IntervalSetFactory } from "../../../Utils/Music/IntervalSetFactory";
  import GlowingText from "../../common/GlowingText.svelte";

  export let intervalSet: IntervalSet;

  $: ordinalLabels = intervalSet.ordinals.map(ordinal => ({
    ordinal,
    label: IntervalSetFactory.fromIntervalSet(intervalSet.shift(-ordinal))
      .displayName
  }))
</script>

{#each ordinalLabels as {ordinal, label}}
  <foreignObject
    x='-150'
    y='-530'
    width='300'
    height='220'
    transform={`rotate(${Angle.iToD(ordinal)})`}
  >
    <div>
      <GlowingText
        text={label}
        blurRadius={0.5}
        spreadRadius={1}
        glowColor='#DDD'
      />
    </div>
  </foreignObject>
{/each}

<style>
  div {
    height: 100%;
    padding: 50px;
    text-align: center;
    font-size: 30px;
  }
</style>