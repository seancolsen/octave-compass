import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import { Subtitle } from "./Subtitle";
import { Scale } from '../../Utils/Music/Scale';

const Aka = styled.span`
  color: #333;
`;

interface Props {
  /**
   * The scale that we're naming
   */
  intervalSet: Scale;

  /**
   * When true, format the list to look good within a modal dialog. This means
   * it will take up more screen space. When false use simpler formatting and
   * take up less screen space.
   */
  isWithinModal: boolean;

  /**
   * Function to execute when the user clicks the "Show more" link within the
   * list of alternate scale names.
   */
  showMore(): void;
}

/**
 * When we're displaying information about a scale, this component displays a
 * text list of the *alternate* names for the scale (not the primary name).
 * Depending on context, this list may appear as a bulleted list or as a simple
 * coma separated list.
 */
export class AlternateScaleNames extends Component<Props> {

  showMore = (event: React.MouseEvent) => {
    event.preventDefault();
    this.props.showMore();
  };

  render() {
    const alternateNames = this.props.intervalSet.alternateNames || [];
    const length = alternateNames.length;
    if (length === 0) {
      return <Subtitle/>;
    }


    if (this.props.isWithinModal) {
      const names = alternateNames.map((name, i) =>
        <li key={i}>{name}</li>
      );
      return (
        <div>
          <div>Alternate names:</div>
          <ul>{names}</ul>
        </div>
      );
    }

    return (
      <Subtitle>
        <Aka>Also know as: </Aka>
        {alternateNames[0]}
        { length > 1 &&
          <Fragment>
            <span>, and </span>
            <a onClick={this.showMore}>
              {length - 1} other name{length > 2 && 's'}...
            </a>
          </Fragment>
        }
      </Subtitle>

    );
  }

}
