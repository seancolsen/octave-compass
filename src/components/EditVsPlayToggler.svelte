<script lang="ts">
  import {getStore} from '../store';
  const {editVsPlay} = getStore();

  $: isPlay = $editVsPlay === 1;
  $: isEdit = $editVsPlay === 0;

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
  <div class:active={isEdit}>Edit Scale</div>
  <div class:active={isPlay}>Play Sounds</div>
</div>

<style>
  .container {
    cursor: pointer;
  }

  .active {
    background: white;
  }
</style>