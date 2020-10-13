<script lang='ts'>
  import { getContext } from "svelte";
  import Button from "./Button.svelte";
  import EditVsPlayToggler from "./EditVsPlayToggler/EditVsPlayToggler.svelte";
  import ChordSelection from "../Modals/ChordSelection/ChordSelection.svelte";
  import Search from "../Modals/Search/Search.svelte";
  import ChooseChordsIcon from "./Icons/ChooseChordsIcon.svelte";
  import SearchIcon from "./Icons/SearchIcon.svelte";

  const {open} = getContext('simple-modal');
  const modal = (component: any) => open(component, {}, {styleWindow: {}});

</script>

<Button on:click={() => modal(Search)} icon={SearchIcon}>
  Search Scales
</Button>

<Button >
  <EditVsPlayToggler />
</Button>

<Button on:click={() => modal(ChordSelection)} icon={ChooseChordsIcon}>
  Choose Chords
</Button>