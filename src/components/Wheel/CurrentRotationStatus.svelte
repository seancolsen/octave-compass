<script lang="ts">
  import { getStore } from '../../store';
  const {
    scaleIsRotating,
    keyboardIsRotating,
    transposeTarget,
    modeShiftTarget,
  } = getStore();
</script>

{#if $scaleIsRotating || $keyboardIsRotating}
  <foreignObject x='-300' y='-300' width='600' height='600'>
    <div class='current-rotation-status'>

      {#if $keyboardIsRotating}
        <div class='status-item keyboard'>
          Transpose to {$transposeTarget}
        </div>
      {/if}

      {#if $scaleIsRotating}
        <div class='status-item scale'>
          Shift to {$modeShiftTarget}
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
  .status-item {
    background: white;
    padding: 0.5em;
    border-radius: 0.5em;
    box-shadow: 0 0 1.5em black;
  }
</style>