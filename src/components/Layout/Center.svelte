<script>
  import Wheel from "../Wheel/Wheel.svelte";
  import LinearKeyboard from '../LinearKeyboard/LinearKeyboard.svelte';
</script>

<div class='center'>
  <div class='wheel'><Wheel/></div>
  <!-- <LinearKeyboard /> -->
</div>

<style>
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  /* #center-content {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  } */

  .wheel {
    /* width: 120%;
    margin-left: -10%;
    margin-top: -10%;
    margin-bottom: -10%; */
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>