<script lang="ts">
  import {keyboardAction} from '../../Utils/Keyboard/actions';
  import { KeyController } from '../../Utils/Keyboard/KeyController';
  import {pitchSet} from '../../store';
  import LinearKeyboardKey from './LinearKeyboardKey.svelte';
  
  const ac = new AudioContext({ latencyHint: "playback", sampleRate: 12000 });
  ac.suspend(); // Chrome does this anyway, so do it explicitly for consistency.

  $: keyControllers = $pitchSet.pitches.map(pitch => 
    new KeyController(ac, pitch)
  );
    
</script>

<div class='keyboard' use:keyboardAction={keyControllers} >
  {#each keyControllers as controller (controller.pitch.frequency)}
    <LinearKeyboardKey {controller} />
  {/each}
</div>

<style>
  .keyboard {display: flex; flex-direction: row;}
</style>