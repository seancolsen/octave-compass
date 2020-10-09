<script lang="ts">
  import {getStore} from '../../store';
  import TogglerChoice from './TogglerChoice.svelte';

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
  
<div class='edit-vs-play-toggler'
  on:mousedown|preventDefault|stopPropagation={toggleWithTransition}
  on:touchstart|preventDefault|stopPropagation={toggleWithTransition}
>
  <TogglerChoice label='Edit Scale' isActive={isEdit} />
  <div class='or'><div class='hr' /><span>or</span></div>
  <TogglerChoice label='Play Notes' isActive={isPlay} />
</div>

<style>
  .edit-vs-play-toggler {
    cursor: pointer;
    height: 100%;
    border-radius: 0 0 2vmax 0;
    /* background: #DDD; */
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 1vmax;
  }
  .edit-vs-play-toggler > :global(.toggler-choice) {
    position: relative;
    z-index: 1;
  }
  .or {
    text-align: center;
    font-style: italic;
    position: relative;
    z-index: 0;
  }
  .hr {
    border-top: solid #BBB 0.1vmax;
    position: absolute;
    z-index: 0;
    top: 1.6vmax;
    left: 10%;
    height: 0.5vmax;
    width: 80%;
  }
  .or span {
    display: inline-block;
    padding: 0 1vmax;
    position: relative;
    z-index: 1;
    background: #DDD;
    color: #666;
  }
</style>