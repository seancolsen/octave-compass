<script lang='ts'>
  export let label: string;
  export let icon = undefined as any;
  export let isActive = false as boolean;
</script>

<div
  class='button'
  class:isActive
  role="button"
  aria-pressed={isActive ? 'true' : 'false'}
  on:click
>
  {#if icon}<div class='icon'><svelte:component this={icon} /></div>{/if}
  {#if label}<div>{label}</div>{/if}
</div>

<style>
  .button {
    display: inline-block;
    padding: 0.2em 0.4em;
    cursor: pointer;
    line-height: 1em;
    text-align: center;
    outline: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: solid 0.1em transparent;
  }
  .button.isActive {
    border-radius: 0.4em;
    background: #f7f7f7;
    border-color: #AAA;
    cursor: default;
  }
  .button > * {margin: 0.2em;}
  .icon {
    height: 2em;
    width: 2em;
  }
</style>