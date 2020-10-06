<script lang="ts">
  import { getStore } from '../../store';
  import { Scalar } from '../../Utils/Math/Scalar';
  import { IntervalSetFactory } from '../../Utils/Music/IntervalSetFactory';
  import GlowingText from '../common/GlowingText.svelte';
  import { Note } from '../../Utils/Music/Note';
  import {scaleRotatorStores, keyboardRotatorStores} from './Wheel.svelte';
  const scaleIsRotating = scaleRotatorStores.isRotating;
  const scaleCurrentDetent = scaleRotatorStores.currentDetent;
  const keyboardIsRotating = keyboardRotatorStores.isRotating;
  const keyboardCurrentDetent = keyboardRotatorStores.currentDetent;
  const {tonalCenter, intervalSet, noteSet} = getStore();


  $: transposeTarget = (() => {
    const noteId = Scalar.wrapToOctave($tonalCenter - $keyboardCurrentDetent);
    const note = $noteSet.notes.find(n => n.id === noteId) ?? new Note(noteId);
    return note.guaranteedName.unicode;
  })();

  $: modeShiftTarget = IntervalSetFactory.fromIntervalSet(
    $intervalSet.shift($scaleCurrentDetent)
  ).displayName

  const glowProps = {
    glowColor: '#E1E1E1',
    blurRadius: 0.4,
    spreadRadius: 1,
  };

</script>

{#if $scaleIsRotating || $keyboardIsRotating}
  <foreignObject x='-300' y='-300' width='600' height='600'>
    <div class='current-rotation-status'>

      {#if $keyboardIsRotating}
        <div class='status-item keyboard'>
          <GlowingText text={`Transpose to ${transposeTarget}`} {...glowProps}/>
        </div>
      {/if}

      {#if $scaleIsRotating}
        <div class='status-item scale'>
          <GlowingText text={`Shift to ${modeShiftTarget} mode`} {...glowProps}/>
        </div>
      {/if}

    </div>
  </foreignObject>
{/if}

<style>
  foreignObject {pointer-events: none;}
  .current-rotation-status {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 35px;
    text-align: center;
    margin: 100px;
    font-weight: bold;
  }
  
</style>