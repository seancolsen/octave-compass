import React from 'react';
import { Url } from "../Utils/Text/Url";
import { StoreContext } from './Store';

interface Props {
  windowTitle: string;
}

export class RouteProcessor extends React.Component<Props> {

  componentDidMount() {
    this.updateWindow();
  }

  componentDidUpdate() {
    this.updateWindow();
  }

  updateWindow() {

    const store = React.useContext(StoreContext); // FIXME
    
    // Compute URL
    const url = Url.generate(store.intervalSet, store.tonalCenter);

    // Update page title
    const appTitle = 'Octave Compass';
    const title = `${this.props.windowTitle} | ${appTitle}`;
    document.title = title;

    // Bail out if no further updates are needed
    if (Url.pathsAreEqual(window.location.pathname, url)) {
      return;
    }

    // Update URL
    window.history.pushState(null, title, url);
  }

  render() {
    return null;
  }

}
