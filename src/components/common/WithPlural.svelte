<script lang='ts'>
  export let count: number;
</script>

<slot {count} s={count === 1 ? '' : 's'} />
