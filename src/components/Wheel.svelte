<script lang="ts">
  // import { Keyboard } from './Wheel/Keyboard';
  import Base from './Wheel/Base.svelte';
  // import { ScaleComponent } from './Wheel/ScaleComponent';
  // import { Rotator } from './Wheel/Rotator';
  // import { Scalar } from '../Utils/Math/Scalar';
  import ShadowFilter from './Wheel/ShadowFilter.svelte';
  import IntervalSetPolygon from './common/IntervalSetPolygon.svelte';
  import BlurFilter from './Wheel/BlurFilter.svelte';

  import { editVsPlay } from '../stores/editVsPlay';
  import { intervalSet } from '../stores/intervalSet';
  import { scaleIsRotating } from '../stores/scaleIsRotating';
  import { keyboardIsRotating } from '../stores/keyboardIsRotating';

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

    <ShadowFilter
      id='shadow-when-edit'
      blurRadius={20}
      opacity={$editVsPlay === 0 ? 1 : 0}
      bounds={3}
    />
    <ShadowFilter
      id='shadow-when-play'
      blurRadius={20}
      opacity={$editVsPlay === 0 ? 0 : 1}
      bounds={3}
    />
    <BlurFilter bounds={3} size={8} id='blur' />

    <Base scaleIsRotating={$scaleIsRotating} />

    {#if $editVsPlay === 1}
      <IntervalSetPolygon
        intervalSet={$intervalSet}
        radius={300}
        class='intervalSetPolygon_play'
      />
    {/if}
    
    <!-- <Rotator
      isRotatable={store.editVsPlay === 0}
      onRotationStart={() => store.keyboardIsRotating = true}
      onRotationRest={r => {store.keyboardIsRotating = false; store.shiftTonalCenter(r)}}
    >{({rotation, currentDetent}) => -->
      <Keyboard
        rotation={0}
        somethingIsRotating={$keyboardIsRotating || $scaleIsRotating}
      />
    <!-- }</Rotator> -->

    <!-- <Rotator
      isRotatable={store.editVsPlay === 0}
      detents={store.intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
      onRotationStart={() => store.scaleIsRotating = true}
      onRotationRest={r => {store.scaleIsRotating = false; store.shiftIntervalSet(r)}}
    >{({rotation, currentDetent}) => -->
      <!-- <ScaleComponent
        rotation={0}
        somethingIsRotating={false}
      /> -->
    <!-- }</Rotator> -->

    {#if $editVsPlay === 0}
      <circle cx={0} cy={0} r={5} class='center-dot' />
    {/if}

  </svg>
</div>

<style>
  svg :global(.intervalSetPolygon_play) {
    fill: #8F8F8F;
    stroke: #CCC;
    stroke-width: 3px;
  }
  :global(#wheel *) { touch-action: none; }
  .center-dot { fill: white; stroke: none; }
</style>
