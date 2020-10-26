<script lang='ts'>
  import SvgCheckbox from "../Wheel/Base/SvgCheckbox.svelte";
  export let isChecked = false as boolean;
</script>

<svg viewBox='-35 -35 70 70' width='2.8em' height='2.8em'>
  <SvgCheckbox {isChecked} />
</svg>
