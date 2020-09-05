<script lang="ts">
  // import { Keyboard } from './Wheel/Keyboard';
  // import { Base } from './Wheel/Base';
  // import { ScaleComponent } from './Wheel/ScaleComponent';
  // import { Rotator } from './Wheel/Rotator';
  // import { Scalar } from '../Utils/Math/Scalar';
  // import { ShadowFilter } from './Wheel/ShadowFilter';
  import IntervalSetPolygon from './common/IntervalSetPolygon.svelte';
  // import { BlurFilter } from './Wheel/BlurFilter';

  import { editVsPlay } from '../stores/editVsPlay';
  import { intervalSet } from '../stores/intervalSet';

  /**
   * The width and height of the square SVG view box in user units (basically SVG
   * pixels). This number is a bit arbitrary since the SVG is then scaled, but
   * all other numerical measurements within the SVG should be considered
   * relative to this value.
   */
  const boxSize = 1000;




  // const StyledIntervalSetPolygon = styled(IntervalSetPolygon)`
  //   fill: #8F8F8F;
  //   stroke: #CCC;
  //   stroke-width: 3px;
  // `;
</script>

<div id='wheel'> <!-- TODO: set touch-action: none; for this and all children -->
  <svg viewBox={`-${boxSize/2} -${boxSize/2} ${boxSize} ${boxSize}`}>

    <!-- <ShadowFilter
      id='shadow-when-edit'
      blurRadius={20}
      opacity={store.editVsPlay === 0 ? 1 : 0}
      bounds={3}
    />
    <ShadowFilter
      id='shadow-when-play'
      blurRadius={20}
      opacity={store.editVsPlay === 0 ? 0 : 1}
      bounds={3}
    />
    <BlurFilter bounds={3} size={8} id='blur' /> -->

    <!-- <Base scaleIsRotating={store.scaleIsRotating} /> -->

    {#if $editVsPlay === 1}
      <IntervalSetPolygon intervalSet={$intervalSet} radius={300} />
    {/if}
    
    <!-- <Rotator
      isRotatable={store.editVsPlay === 0}
      onRotationStart={() => store.keyboardIsRotating = true}
      onRotationRest={r => {store.keyboardIsRotating = false; store.shiftTonalCenter(r)}}
    >{({rotation, currentDetent}) => -->
      <!-- <Keyboard
        rotation={rotation}
        somethingIsRotating={store.keyboardIsRotating || store.scaleIsRotating}
      /> -->
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

    <!-- {store.editVsPlay === 0 &&
      <circle cx={0} cy={0} r={5} fill='white' stroke='none' />
    } -->

  </svg>
</div>
