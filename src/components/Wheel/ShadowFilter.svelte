<script lang="ts">
  export let id: string;
  export let blurRadius = 20;
  export let opacity = 1;
  export let bounds = 3;
  export let offsetX = 0;
  export let offsetY = 0;
</script>

<filter
  id={id}
  x={-(bounds - 1) / 2}
  y={-(bounds - 1) / 2}
  width={bounds}
  height={bounds}
>
  <feGaussianBlur in="SourceAlpha" stdDeviation={blurRadius}/>
  <feOffset dx={offsetX} dy={offsetY} result="offsetblur"/>
  <feComponentTransfer>
    <feFuncA type="linear" slope={opacity}/>
  </feComponentTransfer>
  <feMerge> 
    <feMergeNode/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
