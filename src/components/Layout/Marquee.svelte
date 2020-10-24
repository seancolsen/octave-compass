<script lang="ts">
  import {getStore} from '../../store';
  const { title, intervalSet, scaleIsRotating } = getStore();
</script>

<div
  class='marquee'
  class:scaleIsRotating={$scaleIsRotating}
>
  <h1 class:isNamed={$intervalSet.isNamed}>{$title}</h1>
</div>

<style>
  .marquee {
    justify-content: center;
  }
  .marquee.scaleIsRotating {
    visibility: hidden;
  }
  h1 { text-align: center; color: #222; line-height: 1.1em; }
  h1.isNamed { font-style: italic; }
</style>