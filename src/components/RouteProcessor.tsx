import React from 'react';
import { Url } from "../Utils/Text/Url";
import { useStore } from './Store';
import { observer } from 'mobx-react-lite';

export const RouteProcessor = observer(() => {

  const store = useStore();

  const updateStateFromUrl = () => {
    const newState = Url.parse(window.location.pathname);
    store.setTonalCenter(newState.tonalCenter);
    store.setIntervalSet(newState.intervalSet);
  }

  /**
   * Ensure that "forward" and "back" buttons work correctly.
   */
  React.useEffect(() => {
    window.addEventListener('popstate', updateStateFromUrl);
  // [] is given as dependencies because the function updateStateFromUrl should
  // remain constant regardless of any changes to application state.
  }, []);

  /**
   * Set the URL and page title according to the application state.
   */
  React.useEffect(() => {
    // Compute URL
    const url = Url.generate(store.intervalSet, store.tonalCenter);

    // Update page title
    const appTitle = 'Octave Compass';
    const title = `${store.title} | ${appTitle}`;
    document.title = title;

    // Bail out if no further updates are needed
    if (Url.pathsAreEqual(window.location.pathname, url)) {
      return;
    }

    // Update URL
    window.history.pushState(null, title, url);
  }, [store.intervalSet, store.tonalCenter]);
  
  return null;
});
