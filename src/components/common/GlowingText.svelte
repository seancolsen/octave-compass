<script lang="ts">
  export let text: string;
  export let isGlowing = true as boolean;
  export let glowColor = 'white';
  export let blurRadius = 0.4; // em units
  export let spreadRadius = 0.4; // em units
  
  $: words = text.split(' ');
  $: textWordStyle = `
    padding: ${spreadRadius}em;
    margin: -${spreadRadius}em;
  `;
  $: glowWordStyle = `
    ${textWordStyle}
    background-color: ${glowColor};
    color: ${glowColor};
    filter: blur(${blurRadius}em);
  `;
  
</script>

<div class='glowing-text' class:isGlowing>
  
  <div class='glow'>
    {#each words as word}
      <span style={glowWordStyle}>{word}&nbsp;</span>
    {/each}
  </div>

  <div class='text'>
    {#each words as word}
      <span style={textWordStyle}>{word}&nbsp;</span>
    {/each}
  </div>

</div>

<style>
  .glowing-text { position: relative; }
  .glow { position: absolute; visibility: hidden; z-index: 0; width: 100%; }
  .glowing-text.isGlowing .glow {visibility: visible;}
  .text { position: relative; z-index: 1; }
  span {display: inline-block;}
</style>
