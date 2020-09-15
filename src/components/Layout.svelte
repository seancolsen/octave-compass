<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel from "./Wheel/Wheel.svelte";
  import ChordSelection from './ChordSelection/ChordSelection.svelte';
  import Toolbar from "./Toolbar.svelte";

  let modal = null as 'marquee' | null;
</script>


<div id='app' className="App">
  <div id='layout'>
    <Marquee showMore={() => {modal = 'marquee'}}/>
    <Toolbar />
    <Wheel/>
    <ChordSelection />
  </div>
  <div id='modals'>
    <!-- <Modal
      open={modal === 'marquee'}
      onClose={() => setModal(null)}
    >
      <Marquee isWithinModal={true}/>
    </Modal> -->
  </div>
</div>


<style>


</style>