<script context="module" lang="ts">
  import {derived} from 'svelte/store';
  import {RotatorStores} from './Wheel/Rotator.svelte';
  export const scaleRotatorStores = new RotatorStores();
  export const keyboardRotatorStores = new RotatorStores();
  export const somethingIsRotating = derived(
    [scaleRotatorStores.isRotating, keyboardRotatorStores.isRotating],
    ([$s, $k]) => $s || $k
  );
</script>

<script lang="ts">
  import { Scalar } from '../Utils/Math/Scalar';
  import Keyboard from './Wheel/Keyboard.svelte';
  import Base from './Wheel/Base.svelte';
  import ScaleComponent from './Wheel/ScaleComponent.svelte';
  import Rotator from './Wheel/Rotator.svelte';
  import ShadowFilter from './Wheel/ShadowFilter.svelte';
  import IntervalSetPolygon from './common/IntervalSetPolygon.svelte';
  import BlurFilter from './Wheel/BlurFilter.svelte';
  import {
    editVsPlay,
    intervalSet,
    tonalCenter,
  } from '../store';

  /**
   * The width and height of the square SVG view box in user units (basically SVG
   * pixels). This number is a bit arbitrary since the SVG is then scaled, but
   * all other numerical measurements within the SVG should be considered
   * relative to this value.
   */
  const boxSize = 1000;
</script>

<div id='wheel'>
  <svg viewBox={`-${boxSize/2} -${boxSize/2} ${boxSize} ${boxSize}`}>
    <ShadowFilter id='shadow-when-edit' opacity={1 - $editVsPlay} />
    <ShadowFilter id='shadow-when-play' opacity={$editVsPlay} />
    <BlurFilter bounds={3} size={8} id='blur' />
    <Base/>
    <IntervalSetPolygon
      intervalSet={$intervalSet}
      radius={300}
      class='intervalSetPolygon_play'
      opacity={$editVsPlay}
    />
    <Rotator
      isRotatable={$editVsPlay === 0}
      rotatorStores={keyboardRotatorStores}
      onRotationRest={r => {tonalCenter.shift(r)}}
    ><Keyboard/></Rotator>
    <Rotator
      isRotatable={$editVsPlay === 0}
      rotatorStores={scaleRotatorStores}
      detents={$intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
      onRotationRest={r => {intervalSet.shift(r)}}
    ><ScaleComponent/></Rotator>
    <circle cx={0} cy={0} r={5} class='center-dot' opacity={1 - $editVsPlay} />
  </svg>
</div>

<style>
  svg {
    text-rendering: optimizeLegibility;
  }
  svg > :global(.intervalSetPolygon_play) {
    fill: #8F8F8F;
    stroke: #CCC;
    stroke-width: 3px;
  }
  :global(#wheel *) { touch-action: none; }
  .center-dot { fill: white; stroke: none; }
</style>
