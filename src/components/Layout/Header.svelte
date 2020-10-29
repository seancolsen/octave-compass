<script lang="ts">
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";
  import {getStore} from '../../store';

  const { title, intervalSet, scaleIsRotating } = getStore();
  const windowIsWide = getContext('windowIsWide') as Readable<boolean>;
</script>

<div class='header' class:windowIsWide={$windowIsWide}>

  <div
    class='marquee'
    class:scaleIsRotating={$scaleIsRotating}
    class:isNamed={$intervalSet.isNamed}
  >
    <h1>{$title}</h1>
  </div>
  
  <div class='app-info'>
    <div class='brand'>Octave Compass</div>
    <div class='source-code'>
      <a target="_blank"
        href='https://github.com/seancolsen/octave-compass'
      >Source code</a>
    </div>
  </div>
  
</div>

<style>
  .header {
    display: flex;
    flex-direction: row;
    background: #DDD;
    align-items: center;
  }
  .header.windowIsWide {
    background: #EEE;
    border-bottom: solid 0.1em white;
    box-shadow: 0 0 1em 0 black;
  }
  
  .marquee {
    flex-grow: 1;
    text-align: left;
    color: #222;
    line-height: 1.1em;
    padding: 0.5em 2em;
  }
  .marquee.scaleIsRotating {
    visibility: hidden;
  }
  .marquee.isNamed {
    font-style: italic;
  }

  .app-info {
    text-align: right;
    padding: 0.5em;
    line-height: 1.1em;
  }
  .app-info > *, .app-info a {
    color: #777;
  }
</style>
