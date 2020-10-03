<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel from "./Wheel/Wheel.svelte";
  import Keyboard from './Keyboard/Keyboard.svelte';
  import ChordSelection from './ChordSelection/ChordSelection.svelte';
  import EditVsPlayToggler from './EditVsPlayToggler.svelte';
  import LinearKeyboard from './LinearKeyboard/LinearKeyboard.svelte';

  import {getStore} from '../store';
  const {editVsPlay} = getStore();

  let modal = null as 'marquee' | null;
</script>

<div id='app' className="App">
  <div id='layout'>
    <div id='marquee'>
      <Marquee showMore={() => {modal = 'marquee'}}/>
    </div>
    <div id='edit-vs-play-togger'>
      <EditVsPlayToggler />
    </div>
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

#layout {
  position: relative;
}

#marquee {
  height: 8vmax;
  background: #CCC;
  box-shadow: 0 0 10px 0 black;
}

#edit-vs-play-togger {
  position: absolute;
  top: 1vmax;
  left: 1vmax;
  height: 18vmax;
  width: 9vmax;
  border-radius: 1vmax;
  box-shadow: 0 0 10px 0 black;  
}

</style>