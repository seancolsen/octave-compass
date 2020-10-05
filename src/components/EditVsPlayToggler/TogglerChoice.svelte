<script lang="ts">
  import Radio from "./Radio.svelte";
  export let label: string;
  export let isActive: boolean;
  $: words = label.split(' ');
</script>

<div class='container' class:isActive >
  <Radio class='radio' {isActive} />
  <div class='label'>
    <div class='light'>{#each words as word}<div>{word}</div>{/each}</div>
    <div class='text'>{#each words as word}<div>{word}</div>{/each}</div>
  </div>
</div>

<style>
  .container {display: flex; justify-content: space-between; align-items: center;}
  
  .container > :global(.radio) { width: 2.5vmax; height: 2.5vmax; }

  .label {
    text-align: left;
    font-size: 120%;
    line-height: 95%;
    position: relative;
    width: 6.5vmax;
  }
  .light div,
  .text div { display: inline-block; padding: 0.5vmax; margin: -0.5vmax 0; }
  .light {
    position: absolute;
    visibility: hidden;
    z-index: 0;
    filter: blur(0.7vmax);
  }
  .light div { color: #fff000; background: #fff000; }
  .container.isActive .light {visibility: visible;}
  .text { position: relative; z-index: 1; }

</style>