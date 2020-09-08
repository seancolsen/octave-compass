<script lang="ts">
  import { Angle } from '../../Utils/Geometry/Angle';
  import KeySet from './Keyboard/KeySet.svelte';
  import {tonalCenter, pitchSet} from '../../store';

  export let rotation: number;
  export let somethingIsRotating: boolean;
  
  $: rotation = rotation - $tonalCenter;
  $: transform = `rotate(${Angle.iToD(-$tonalCenter)})`;
</script>

<g transform={transform} filter="url('#shadow-when-edit')">
  <KeySet
    pitchSet={$pitchSet.compliment}
    isActive={false}
    rotation={rotation}
  />
  <KeySet
    pitchSet={$pitchSet}
    isActive={!somethingIsRotating}
    rotation={rotation}
  />
</g>