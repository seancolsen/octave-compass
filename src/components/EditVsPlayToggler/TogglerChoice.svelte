<script lang="ts">
  import GlowingText from "../common/GlowingText.svelte";
  import Radio from "./Radio.svelte";
  export let label: string;
  export let isActive: boolean;
</script>

<div class='toggler-choice' class:isActive >
  <Radio class='radio' {isActive} />
  <div class='label'>
    <GlowingText isGlowing={isActive} text={label} glowColor='#fff000' />
  </div>
</div>

<style>
  .toggler-choice {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggler-choice > :global(.radio) { width: 2.5vmax; height: 2.5vmax; }

  .label {
    text-align: left;
    font-size: 120%;
    line-height: 95%;
    width: 6.5vmax;
  }

</style>