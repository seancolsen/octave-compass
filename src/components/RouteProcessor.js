import React from 'react';
import Url from "Utils/Text/Url";

export default class RouteProcessor extends React.Component {

  componentDidMount() {
    this.updateWindow();
  }

  componentDidUpdate() {
    this.updateWindow();
  }

  updateWindow() {
    // Compute URL
    const url = Url.generate(
      this.props.intervalSet,
      this.props.tonalCenter
    );

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
