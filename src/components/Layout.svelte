<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import Wheel, {scaleIsRotating} from "./Wheel/Wheel.svelte";
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
      {#if !$scaleIsRotating}
        <Marquee showMore={() => {modal = 'marquee'}}/>
      {/if}
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
  :global(body),
  #app,
  #layout {height: 100vh; overflow: hidden; width: 100%; position: fixed;}
  :global(body) { background: #DDD; }

  #layout { position: relative; }

  #marquee {
    position: relative;
    left: 20%;
    top: -2vmax;
    width: 60%;
    height: 8vmax;
    padding-top: 2vmax;
    background: #DDD;
    border-radius: 0 0 2vmax 2vmax;
  }

  #edit-vs-play-togger {
    position: absolute;
    top: 0vmax;
    left: 0vmax;
    height: 12vmax;
    width: 12vmax;
  }
</style>