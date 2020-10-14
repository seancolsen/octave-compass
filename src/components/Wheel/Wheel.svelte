<script context="module" lang="ts">
  import {derived} from 'svelte/store';
  import {RotatorStores} from './Rotator.svelte';
  export const scaleRotatorStores = new RotatorStores();
  export const keyboardRotatorStores = new RotatorStores();
  export const scaleIsRotating = scaleRotatorStores.isRotating;
  export const keyboardIsRotating = keyboardRotatorStores.isRotating;
  export const somethingIsRotating = derived(
    [scaleIsRotating, keyboardIsRotating],
    ([$s, $k]) => $s || $k
  );
</script>

<script lang="ts">
  import { Scalar } from '../../Utils/Math/Scalar';
  import RotaryKeyboard from './RotaryKeyboard/RotaryKeyboard.svelte';
  import Base from './Base.svelte';
  import ScaleComponent from './Scale/ScaleComponent.svelte';
  import Rotator from './Rotator.svelte';
  import ShadowFilter from './ShadowFilter.svelte';
  import IntervalSetPolygon from '../common/IntervalSetPolygon.svelte';
  import Tips from './Tips/Tips.svelte';
  import BlurFilter from './BlurFilter.svelte';
  import {getStore} from '../../store';
  import CurrentRotationStatus from './CurrentRotationStatus.svelte';
  import { afterUpdate } from 'svelte';
  import { setupKeyboard } from '../Keyboard/Keyboard';
  const {
    editVsPlay,
    intervalSet,
    tonalCenter,
    keyElements
  } = getStore();

  /**
   * The outer edges of the the interval label texet is at a radius of 1000, so
   * that's what we're calling the 'boxSize' here. But the ModeShiftHelpText
   * is placed beyond that radius (and usually hidden). This behavior makes this
   * whole layout quite complex.
   */
  const viewBox = (() => {
    const boxSize = 1000;
    const marginTop = 200;
    const marginBottom = 50;
    const x = 0 - boxSize / 2;
    const y = 0 - boxSize / 2 - marginTop;
    const width = boxSize;
    const height = boxSize + marginTop + marginBottom;
    return `${x} ${y} ${width} ${height}`;
  })();

  $: isRotatable = $editVsPlay === 0;

  let ref: SVGElement;
  let destroyKeyboard = () => {};
  
  afterUpdate(() => {
    destroyKeyboard();
    if ($editVsPlay === 1) {
      destroyKeyboard = setupKeyboard(ref, keyElements);
    }
  });
</script>

<svg
  class='wheel'
  class:isRotatable
  bind:this={ref}
  {viewBox}
>
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
    <RotaryKeyboard />
  </Rotator>
  <Rotator {isRotatable}
    rotatorStores={scaleRotatorStores}
    detents={$intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
    onRotationRest={r => {intervalSet.shift(r)}}
  >
    <ScaleComponent/>
  </Rotator>
  <circle cx={0} cy={0} r={5} class='center-dot' opacity={1 - $editVsPlay} />
  <CurrentRotationStatus />
  {#if !$somethingIsRotating}<Tips />{/if}
</svg>

<style>
  .wheel {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-rendering: optimizeLegibility;
  }
  .wheel > :global(.intervalSetPolygon_play) {
    fill: #CCC;
    stroke: #e8e8e8;
    stroke-width: 3px;
  }
  .center-dot { fill: #444; stroke: none; }
  .wheel.isRotatable :global(.scale-component) {
    animation: oscillate 700ms ease-in-out;
  }
  .wheel.isRotatable :global(.rotary-keyboard) {
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