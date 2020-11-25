<script lang="ts">
  import { getStore } from '../../store';
  import GlowingText from '../common/GlowingText.svelte';
  const {
    scaleIsRotating,
    keyboardIsRotating,
    transposeTarget,
    modeShiftTarget,
  } = getStore();

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
          <GlowingText text={`Transpose to ${$transposeTarget}`} {...glowProps}/>
        </div>
      {/if}

      {#if $scaleIsRotating}
        <div class='status-item scale'>
          <GlowingText text={`Shift to ${$modeShiftTarget}`} {...glowProps}/>
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