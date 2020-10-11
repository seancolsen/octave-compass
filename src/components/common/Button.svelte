<script lang='ts'>
</script>

<div on:click >
  <slot />
</div>

<style>
  div {
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
  }
</style>