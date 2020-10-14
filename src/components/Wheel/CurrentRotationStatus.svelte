<script lang="ts">
  import { getStore } from '../../store';
  import { Scalar } from '../../Utils/Math/Scalar';
  import { IntervalSetFactory } from '../../Utils/Music/IntervalSetFactory';
  import GlowingText from '../common/GlowingText.svelte';
  import { Note } from '../../Utils/Music/Note';
  import {scaleRotatorStores, keyboardRotatorStores} from './Wheel.svelte';
  import { Scale } from '../../Utils/Music/Scale';
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

  $: modeShiftTarget = (() => {
    const targetIntervalSet = IntervalSetFactory.fromIntervalSet(
      $intervalSet.shift($scaleCurrentDetent)
    );
    return targetIntervalSet.displayName
      + (targetIntervalSet instanceof Scale ? ' mode' : '');
  })();

  const glowProps = {
    glowColor: '#EEE',
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
          <GlowingText text={`Shift to ${modeShiftTarget}`} {...glowProps}/>
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
    line-height: 1em;
    text-align: center;
    margin: 100px;
    font-weight: bold;
  }
  
</style>