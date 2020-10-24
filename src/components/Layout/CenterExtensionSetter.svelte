<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";

  export let isExtended = false as boolean;

  let centerIsExtended = getContext('centerIsExtended') as Writable<boolean>;
  onMount(() => {
    $centerIsExtended = isExtended;
  });
</script>

<slot />
