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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .wheel {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
</style>