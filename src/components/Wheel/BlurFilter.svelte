<script lang="ts">
  export let id: string;
  export let size: number;
  export let bounds = 1.2;
</script>

<filter
  id={id}
  x={-(bounds - 1) / 2}
  y={-(bounds - 1) / 2}
  width={bounds}
  height={bounds}
>
  <feGaussianBlur in="SourceGraphic" stdDeviation={size}/>
</filter>