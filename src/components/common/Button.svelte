<script lang='ts'>
</script>

<div on:click >
  <slot />
</div>

<style>
  div {
    display: inline-block;
    padding: 0.4vmax 0.7vmax;
    border-radius: 0.4vmax;
    background: #f2f2f2;
    border: solid 0.1vmax #bcbcbc;
    cursor: pointer;
    line-height: 1.7vmax;
    text-align: center;
    outline: none;
    color: black;
  }
</style>