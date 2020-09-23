<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel from "./Wheel/Wheel.svelte";
  import Keyboard from './Keyboard/Keyboard.svelte';
  import ChordSelection from './ChordSelection/ChordSelection.svelte';
  import Toolbar from "./Toolbar.svelte";
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';

  import {getStore} from '../store';
  const {editVsPlay} = getStore();

  let modal = null as 'marquee' | null;
</script>

<div id='app' className="App">
  <div id='layout'>
    <Marquee showMore={() => {modal = 'marquee'}}/>
    <Toolbar />
    <Keyboard isPlayable={$editVsPlay === 1}>
      <Wheel/>
      {#if $editVsPlay === 0}<ChordSelection />{/if}
      {#if $editVsPlay === 1}<LinearKeyboard />{/if}
    </Keyboard>
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