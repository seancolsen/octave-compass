<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel from "./Wheel.svelte";
  // import { Menu } from "./Menu";
  import Toolbar from "./Toolbar.svelte";

  let modal = null as 'marquee' | null;
</script>


<div id='app' className="App">
  <div id='layout'>
    <Marquee showMore={() => {modal = 'marquee'}}/>
    <Toolbar />
    <div id='wheel-container'><Wheel/></div>
    <!-- <Menu/> -->
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

#wheel-container {
  overflow: hidden;
  text-align: center;
  position: relative;
}

</style>