<script lang="ts">
  import Radio from "./Radio.svelte";

  export let label: string;
  export let isActive: boolean;

  $: labelWords = label.split(' ');
</script>

<div
  class='container'
  class:isActive
>
  <Radio class='radio' {isActive} />
  <div class='label'>
    <div class='highlight'>
      {#each labelWords as word}<div>{word}</div>{/each}
    </div>
    <div class='text'>
      {#each labelWords as word}<div>{word}</div>{/each}
    </div>
  </div>
</div>

<style>

  .container { height: 50%; position: relative; }
  .isActive { box-shadow: none; }
  
  .label {
    position: absolute;
    bottom: 10%;
    left: 40%;
    text-align: left;
    font-size: 120%;
    line-height: 95%;
  }

  .highlight div,
  .text div {
    display: inline-block;
    padding: 0.5vmax;
    margin: -0.5vmax 0;
  }
  .highlight {
    position:absolute;
    visibility: hidden;
    z-index: 0;
    filter: blur(0.7vmax);
  }
  .highlight div {
    color: #fff000;
    background: #fff000;
  }
  .container.isActive .highlight {visibility: visible;}
  .text { position: relative; z-index: 1; }

  .container > :global(.radio) {
    width: 2.5vmax;
    height: 2.5vmax;
    position: absolute;
    bottom: 15%;
    left: 10%;
  }

</style>