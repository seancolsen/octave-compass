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
  import Tips from './Wheel/Tips.svelte';
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
  $: isRotatable = $editVsPlay === 0;
</script>

<div id='wheel' class:isRotatable >
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
    <Rotator {isRotatable}
      rotatorStores={keyboardRotatorStores}
      onRotationRest={r => {tonalCenter.shift(r)}}
    >
      <Keyboard />
    </Rotator>
    <Rotator {isRotatable}
      rotatorStores={scaleRotatorStores}
      detents={$intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
      onRotationRest={r => {intervalSet.shift(r)}}
    >
      <ScaleComponent/>
    </Rotator>
    <circle cx={0} cy={0} r={5} class='center-dot' opacity={1 - $editVsPlay} />
    <!-- <Tips /> -->
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
  #wheel.isRotatable :global(#scale) {
    animation: oscillate 700ms ease-in-out;
  }
  #wheel.isRotatable :global(#keyboard) {
    animation: oscillate-reverse 700ms ease-in-out;
  }
  @keyframes oscillate {
      0% {transform: rotate( 0.0deg);}
     14% {transform: rotate( 3.0deg);}
     29% {transform: rotate(-2.5deg);}
     43% {transform: rotate( 2.0deg);}
     57% {transform: rotate(-1.5deg);}
     71% {transform: rotate( 1.0deg);}
     86% {transform: rotate(-0.5deg);}
    100% {transform: rotate( 0.0deg);}
  }
  @keyframes oscillate-reverse {
      0% {transform: rotate( 0.0deg);}
     14% {transform: rotate(-3.0deg);}
     29% {transform: rotate( 2.5deg);}
     43% {transform: rotate(-2.0deg);}
     57% {transform: rotate( 1.5deg);}
     71% {transform: rotate(-1.0deg);}
     86% {transform: rotate( 0.5deg);}
    100% {transform: rotate( 0.0deg);}
  }
</style>