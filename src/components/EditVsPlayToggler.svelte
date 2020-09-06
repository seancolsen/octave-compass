<script lang="ts">
  import { editVsPlay } from '../stores/editVsPlay';

  const isEdit = $editVsPlay === 0;
  const isPlay = !isEdit;

  /**
   * Set a new value for editVsPlay, and transition to that value with
   * animation.
   * 
   * @param newValue The desired editVsPlay value
   */
  function setWithTransition(newValue: 0 | 1) {
    if ($editVsPlay === newValue) {return;}
    const transitionDuration = 200; // (ms)
    const direction = newValue ? 1 : -1;
    const startValue = Math.round($editVsPlay);
    const step = (currentTime: DOMHighResTimeStamp) => {
      const timeElapsed = currentTime - transitionStartTime;
      if (timeElapsed > transitionDuration) {
        $editVsPlay = newValue;
        return;
      }
      $editVsPlay = startValue + timeElapsed / transitionDuration * direction;
      window.requestAnimationFrame(step)
    };
    const transitionStartTime = performance.now();
    window.requestAnimationFrame(step)
  }

  function toggleWithTransition() {
    const newValue = Math.round($editVsPlay) ? 0 : 1;
    setWithTransition(newValue);
  }
</script>
  
<div
  class='container'
  on:click={toggleWithTransition}
>
  toggle {$editVsPlay}
</div>

<style>
  .container {
    cursor: pointer;
  }
</style>