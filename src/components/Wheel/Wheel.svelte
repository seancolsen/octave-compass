<script lang="ts">
  import { Scalar } from '../../Utils/Math/Scalar';
  import RotaryKeyboard from './RotaryKeyboard/RotaryKeyboard.svelte';
  import Base from './Base.svelte';
  import ScaleComponent from './Scale/ScaleComponent.svelte';
  import Rotator from './Rotator/Rotator.svelte';
  import ShadowFilter from './ShadowFilter.svelte';
  import IntervalSetPolygon from '../common/IntervalSetPolygon.svelte';
  import Tips from './Tips/Tips.svelte';
  import BlurFilter from './BlurFilter.svelte';
  import {getStore} from '../../store';
  import CurrentRotationStatus from './CurrentRotationStatus.svelte';
  import { afterUpdate } from 'svelte';
  import { setupKeyboard } from '../Keyboard/Keyboard';
  import IntervalsPlaying from './IntervalsPlaying.svelte';
  
  const {
    editVsPlay,
    intervalSet,
    tonalCenter,
    keyElements,
    scaleRotator,
    keyboardRotator,
    somethingIsRotating
  } = getStore();

  const viewBox = (() => {
    const boxSize = 1030;
    const x = 0 - boxSize / 2;
    return `${x} ${x} ${boxSize} ${boxSize}`;
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


<div class='wheel' class:isRotatable>
  <svg bind:this={ref} {viewBox}
    text-rendering={$somethingIsRotating ? 'optimizeSpeed' : 'optimizeLegibility'}
  >
    <ShadowFilter id='shadow-when-edit' opacity={(1 - $editVsPlay) * 0.4} />
    <ShadowFilter id='shadow-when-play' opacity={($editVsPlay) * 0.4} />
    <BlurFilter bounds={3} size={8} id='blur' />
    <Base/>
    <IntervalSetPolygon
      intervalSet={$intervalSet}
      radius={300}
      class='intervalSetPolygon_play'
      opacity={$editVsPlay}
    />
    
    <Rotator {isRotatable}
      controller={keyboardRotator}
      onRotationRest={r => {tonalCenter.shift(r)}}
    >
      <RotaryKeyboard />
    </Rotator>
    <Rotator {isRotatable}
      controller={scaleRotator}
      detents={$intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
      onRotationRest={r => {intervalSet.shift(r)}}
    >
      <ScaleComponent/>
    </Rotator>
    <circle cx={0} cy={0} r={5} class='center-dot' opacity={1 - $editVsPlay} />
    <CurrentRotationStatus />
    {#if !$somethingIsRotating}<Tips />{/if}
    <IntervalsPlaying />
  </svg>
</div>


<style>

  .wheel {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  
  svg {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  svg > :global(.intervalSetPolygon_play) {
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