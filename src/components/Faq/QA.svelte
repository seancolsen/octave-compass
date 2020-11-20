<div class="qa">
  <slot />
</div>

<style>
  .qa {
    border-bottom: solid 0.1em #CCC;
    padding-bottom: 1em;
    margin-bottom: 1em;
  }

  .qa:last-child {
    border-bottom: none;
  }

  .qa :global(.q),
  .qa :global(.a) {
    display: flex;
  }
  .qa :global(.prompt) {
    width: 2em;
    flex-shrink: 0;
    flex-grow: 0;
  }
</style>