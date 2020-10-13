<script lang='ts'>
  import { getContext } from "svelte";
  import Button from "./Button.svelte";
  import ChordSelection from "../Modals/ChordSelection/ChordSelection.svelte";
  import Search from "../Modals/Search/Search.svelte";
  import ChooseChordsIcon from "./Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "./Icons/SearchIcon.svelte";
  import Divider from "./Divider.svelte";
  import PlaySoundsIcon from "./Icons/PlaySoundsIcon.svelte";
  import EditScaleIcon from "./Icons/EditScaleIcon.svelte";
  import { getStore } from "../../store";
import MoreOptionsIcon from "./Icons/MoreOptionsIcon.svelte";

  const {editVsPlay} = getStore();
  const {open} = getContext('simple-modal');
  const modal = (component: any) => open(component, {}, {styleWindow: {}});

</script>

<Button
  on:click={() => modal(Search)}
  icon={SearchIcon}
  label='Search Scales'
/>
  
<Divider />

<Button
  on:click={() => modal(ChordSelection)}
  icon={EditScaleIcon}
  label='Edit Scale'
  isActive={$editVsPlay === 0}
/>
  
<Button
  on:click={() => modal(ChordSelection)}
  icon={PlaySoundsIcon}
  label='Play Sounds'
  isActive={$editVsPlay === 1}
/>
  
<Divider />

<Button
  on:click={() => modal(ChordSelection)}
  icon={ChooseChordsIcon}
  label='Choose Chords'
/>
  
<Button
  on:click={() => {}} 
  label='More Options'
  icon={MoreOptionsIcon}
/>