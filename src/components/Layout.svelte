<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel from "./Wheel/Wheel.svelte";
  import Keyboard from './Keyboard/Keyboard.svelte';
  import ChordSelection from './ChordSelection/ChordSelection.svelte';
  import EditVsPlayToggler from './EditVsPlayToggler/EditVsPlayToggler.svelte';
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
  position: relative;
  left: 20%;
  top: -2vmax;
  width: 60%;
  height: 8vmax;
  padding-top: 2vmax;
  background: #AAA;
  border: solid #CCC 0.3vmax;
  /* box-shadow: 0 0 20px 0 black inset; */
  border-radius: 0 0 2vmax 2vmax;
}

#edit-vs-play-togger {
  position: absolute;
  top: 0vmax;
  left: 0vmax;
  height: 14vmax;
  width: 11vmax;
}

</style>