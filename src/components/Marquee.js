import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import AlternateScaleNames from "components/Marquee/AlternateScaleNames";
import Chord from "Utils/Music/Chord";
import {Subtitle} from "components/Marquee/Subtitle";
import Url from "Utils/Text/Url";

const DefaultName = styled.div`
  text-align: center;
`;

const IntervalSetName = styled.span`
  font-weight: bold;
`;

const UnknownName = styled.span`
  font-style: italic;
`;

const NoteName = styled.span`
  font-weight: bold;
`;

export default class Marquee extends Component {

  componentDidUpdate() {
    this.updateWindow();
  }

  updateWindow() {
    // Compute URL
    const url = Url.generate(
      this.props.intervalSet,
      this.props.noteSet.tonalCenterId
    );

    // Bail out if non further updates are needed
    if (Url.pathsAreEqual(window.location.pathname, url)) {
      return;
    }

    // Update page title
    const appTitle = 'Octave Compass';
    const title = `${this.windowTitle()} | ${appTitle}`;
    document.title = title;

    // Update URL
    window.history.pushState(null, title, url);
  }

  scaleContent() {
    const isNamed = !!this.props.intervalSet.defaultName;
    const NameContainer = isNamed ? IntervalSetName : UnknownName;
    const intervalSetName = this.props.intervalSet.displayName;
    const tonalCenterName = this.props.noteSet.tonalCenterName;
    return {
      text: `${intervalSetName} in ${tonalCenterName}`,
      markup: <Fragment>
        <DefaultName>
          <NameContainer>{intervalSetName}</NameContainer>
          <span> in </span>
          <NoteName>{tonalCenterName}</NoteName>
        </DefaultName>
        <AlternateScaleNames intervalSet={this.props.intervalSet}/>
      </Fragment>
    };
  }

  chordContent() {
    const inversion = this.props.intervalSet.inversion;
    const inversionText = inversion === 0 ? '' : `(inversion ${inversion})`;
    const rootNote = this.props.noteSet.rootNote(inversion);
    const tonalCenterName = rootNote.nameToUseForLabels;
    const chordName = this.props.intervalSet.displayName;
    const displayName = `${tonalCenterName} ${chordName} chord`;
    return {
      text: `${displayName}${inversionText ? ' ' : ''}${inversionText}`,
      markup: <Fragment>
        <DefaultName>
          <IntervalSetName>{displayName}</IntervalSetName>
        </DefaultName>
        <Subtitle>{inversionText}</Subtitle>
      </Fragment>
    };
  }

  /**
   * Get the content of this Marquee, depending on whether we have a chord or a
   * scale.
   *
   * @return {{text, markup}}
   */
  content() {
    return this.props.intervalSet instanceof Chord ?
      this.chordContent() : this.scaleContent();
  }

  /**
   * This function gets called within App when App wants to set a new window
   * title.
   *
   * @return {string}
   */
  windowTitle() {
    return this.content().text;
  }

  render() {
    return (
      <div className={this.props.className} id='marquee'>
        {this.content().markup}
      </div>
    );
  }

}
