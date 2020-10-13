<script lang='ts'>
  export let icon = undefined as any;
</script>

<div class='button' on:click >
  {#if icon}<div class='icon'><svelte:component this={icon} /></div>{/if}
  <div><slot /></div>
</div>

<style>
  .button {
    display: inline-block;
    padding: 0.2em 0.4em;
    border-radius: 0.4em;
    background: #f2f2f2;
    border: solid 0.05em #bcbcbc;
    cursor: pointer;
    line-height: 1em;
    text-align: center;
    outline: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .button > * {margin: 0.2em;}
  .icon {
    height: 2em;
    width: 2em;
  }
</style>