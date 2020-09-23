<script lang="ts">
  import {afterUpdate, onMount} from 'svelte';
  import { Url } from "../Utils/Text/Url";

  import {getStore} from '../store';
  const {tonalCenter, intervalSet, title} = getStore();

  const updateStateFromUrl = () => {
    const url = Url.parse(window.location.pathname);
    tonalCenter.set(url.tonalCenter);
    intervalSet.smartUpdate(() => url.intervalSet);
  }

  /**
   * Ensure that "forward" and "back" buttons work correctly.
   */
  onMount(() => {
    window.addEventListener('popstate', updateStateFromUrl);
  });

  /**
   * Set the URL and page title according to the application state.
   */
  afterUpdate(() => {
    const url = Url.generate($intervalSet, $tonalCenter);
    document.title = `${$title} | Octave Compass`;
    if (Url.pathsAreEqual(window.location.pathname, url)) {
      return;
    }
    window.history.pushState(null, $title, url);
  });

</script>