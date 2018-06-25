import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import {Subtitle} from "components/Marquee/Subtitle";

const Aka = styled.span`
  color: #333;
`;

export default class AlternateScaleNames extends Component {

  showMore = (event) => {
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
