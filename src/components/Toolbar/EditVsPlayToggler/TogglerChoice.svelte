<script lang="ts">
  import Radio from "./Radio.svelte";
  export let label: string;
  export let isActive: boolean;
  export let icon: any;
</script>

<div class='toggler-choice' class:isActive >
  <div class='radio'><Radio {isActive} /></div>
  <div class='content'>
    <div class='icon'><svelte:component this={icon} /></div>
    <div class='label'>{label}</div>
  </div>
</div>

<style>
  .toggler-choice {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    padding: 0.2em 0.4em;
    background: #f2f2f2;
    border: solid 0.05em #bcbcbc;
    border-radius: 0.4em 0 0 0.4em;
  }
  .toggler-choice:last-child {
    border-radius:  0 0.4em 0.4em 0;
    border-left: none;
  }
  .toggler-choice.isActive {
    background: white;
  }
  .toggler-choice :global(path) {
    fill: #666;
  }
  .radio {
    top: 0.6em;
    left: 0.6em;
    height: 1.2em;
    width: 1.2em;
  }
  .content {
    margin-left: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .label {
    text-align: center;
  }
  .icon {
    height: 2em;
    width: 2em;
  }
</style>