<script lang="ts">
  import GlowingText from "../common/GlowingText.svelte";
  import Radio from "./Radio.svelte";
  export let label: string;
  export let isActive: boolean;
</script>

<div class='toggler-choice' class:isActive >
  <Radio class='radio' {isActive} />
  <div class='label'>
    <GlowingText isGlowing={isActive} text={label} />
  </div>
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

</style>