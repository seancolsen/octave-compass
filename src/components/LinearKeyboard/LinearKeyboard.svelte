<script lang="ts">
  import LinearKey from './LinearKey.svelte';
  import {getStore} from '../../store';
  import {setupKeyboard} from '../Keyboard/Keyboard';
  import { afterUpdate, onMount } from 'svelte';
  
  const {noteSet, tonalCenter, keyElements} = getStore();
  const pitchesInOctave = (octave: number) => $noteSet.notes.map(note => 
    note.pitchAboveTonalCenterInOctave($tonalCenter, octave)
  )

  let keyboardElement: Element;
  let windowElement: HTMLDivElement;
  let destroyKeyboard = () => {};

  $: pitches = [
    ...pitchesInOctave(3),
    ...pitchesInOctave(4),
    ...pitchesInOctave(5),
    $noteSet.notes[0].pitchAboveTonalCenterInOctave($tonalCenter, 6)
  ];

  function setScrollPositionToCenter() {
    if (windowElement) {
      const maxScroll = windowElement.scrollWidth - windowElement.clientWidth;
      windowElement.scrollLeft = maxScroll / 2;
    }
  }

  afterUpdate(() => {
    destroyKeyboard();
    destroyKeyboard = setupKeyboard(keyboardElement, keyElements);
    setScrollPositionToCenter();
  });

</script>

<div class='linear-keyboard'>
  <div class='background' />
  <div class='window' bind:this={windowElement}>
    <div class='keyboard' bind:this={keyboardElement} >
      {#each pitches as pitch (pitch.slashNotation)}
        <LinearKey {pitch} />
      {/each}
    </div>
  </div>
  <div class='shadow' />
</div>

<style>
  .window {
    touch-action: pan-x !important;
  }

  .linear-keyboard {
    height: 20vh;
    position: relative;
  }
  .window {
    position: relative;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .keyboard {
    height: 100%;
    width: max-content;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    position: relative;
  }


  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background: #CCC;
  }
  .shadow {
    box-shadow: 0 0 0.6em 0 black inset;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
  }
</style>