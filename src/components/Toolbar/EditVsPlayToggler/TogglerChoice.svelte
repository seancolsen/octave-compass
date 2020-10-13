<script lang="ts">
  import GlowingText from "../../common/GlowingText.svelte";
  import Radio from "./Radio.svelte";
  export let label: string;
  export let isActive: boolean;
  export let icon = undefined as any;
</script>

<div class='toggler-choice' class:isActive >
  <Radio class='radio' {isActive} />
  <div class='label'>
    <GlowingText isGlowing={isActive} text={label} />
  </div>
  {#if icon}<div class='icon'><svelte:component this={icon} /></div>{/if}
</div>

<style>
  .toggler-choice {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .label {
    text-align: left;
    width: 4em;
  }
  .icon {
    height: 2.5em;
    width: 2.5em;
  }
</style>