import React from 'react';
import Url from "Utils/Text/Url";

export default class RouteProcessor extends React.Component {

  componentDidMount() {
    this.updateStateFromUrl();
    this.updateWindow();
    window.addEventListener('popstate', () => this.updateStateFromUrl());
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

    // Bail out if no further updates are needed
    if (Url.pathsAreEqual(window.location.pathname, url)) {
      return;
    }

    // Update page title
    const appTitle = 'Octave Compass';
    const title = `${this.props.windowTitle} | ${appTitle}`;
    document.title = title;

    // Update URL
    window.history.pushState(null, title, url);
  }

  updateStateFromUrl() {
    const url = window.location.pathname;
    const parts = Url.parse(url);
    this.props.setOrientation(parts.intervalSet, parts.tonalCenter);
  }

  render() {
    return null;
  }

}
