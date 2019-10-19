import React, { Fragment } from 'react';
import styled from "styled-components";
import { Subtitle } from "./Subtitle";
import { IntervalSet } from '../../Utils/Music/IntervalSet';
import { Scale } from '../../Utils/Music/Scale';

const Aka = styled.span`
  color: #333;
`;

interface Props {
  /**
   * The IntervalSet that we're naming. The type is IntervalSet here (and not
   * Scale) so that we can accept many input values. If the value given here
   * ends up being an instance of Scale, then we'll see if it has alternate
   * names. If the value given is only an IntervalSet (and not specifically a
   * scale), the we don't bother listing any alternate names because we know it
   * won't have any.
   */
  intervalSet: IntervalSet;

  /**
   * When true, format the list to look good within a modal dialog. This means
   * it will take up more screen space. When false use simpler formatting and
   * take up less screen space.
   */
  isWithinModal?: boolean;

  /**
   * Function to execute when the user clicks the "Show more" link within the
   * list of alternate scale names.
   */
  showMore?(): void;
}

/**
 * When we're displaying information about a scale, this component displays a
 * text list of the *alternate* names for the scale (not the primary name).
 * Depending on context, this list may appear as a bulleted list or as a simple
 * coma separated list.
 */
export function AlternateScaleNames(props: Props) {

  const showMore = (event: React.MouseEvent) => {
    event.preventDefault();
    if (props.showMore) {
      props.showMore();
    }
  };

  let alternateNames: string[] = [];
  if (props.intervalSet instanceof Scale ) {
    alternateNames = props.intervalSet.alternateNames;
  }
  
  const length = alternateNames.length;
  if (length === 0) {
    return <Subtitle/>;
  }


  if (props.isWithinModal) {
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
          <a onClick={showMore}>
            {length - 1} other name{length > 2 && 's'}...
          </a>
        </Fragment>
      }
    </Subtitle>
  );

}
