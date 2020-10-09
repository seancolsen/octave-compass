<script lang='ts'>
</script>

<div on:click >
  <slot />
</div>

<style>
  div {
    display: inline-block;
    padding: 0.4vmax 0.7vmax;
    border-radius: 0.8vmax;
    background: #f2f2f2;
    border: solid 0.1vmax #bcbcbc;
    /* box-shadow: 0 0 0.7vmax 0 black ; */
    cursor: pointer;
    line-height: 1.7vmax;
    text-align: center;
    outline: none;
    color: black;
  }
</style>