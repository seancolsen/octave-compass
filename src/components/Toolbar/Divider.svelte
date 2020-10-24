<script lang="ts">
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";
  const isVertical = getContext('windowIsWide') as Readable<boolean>;
</script>

<div class='divider' class:isVertical={$isVertical} />

<style>
  .divider {
    border-left: solid 0.1em #AAA;
    margin: 0 0.5em;
  }
  .divider.isVertical {
    border-left: none;
    border-top: solid 0.1em #AAA;
    margin: 0.5em 0;
  }
</style>