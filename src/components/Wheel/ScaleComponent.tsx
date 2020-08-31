import React from 'react';
import styled from "styled-components";
import { IntervalSetPolygon, IntervalSetPolygonProps } from '../common/IntervalSetPolygon';
import { OrdinalChordSet } from '../../Utils/Music/OrdinalChordSet';
import { SwarmOfChords } from './Scale/SwarmOfChords';
import { useStore } from '../Store';
import { observer } from 'mobx-react-lite';

const Background = styled(IntervalSetPolygon)`
  fill: #E1E1E1;
  stroke: #f7f7f7;
  stroke-width: 3px;
  filter: url(#shadow-when-edit);
`;

interface Props {
  rotation: number;
  somethingIsRotating: boolean;
}

export const ScaleComponent = observer((props: Props) => {
  const store = useStore();
  const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
    store.intervalSet,
    store.selectedChords
  );
  return (
    <g>
      {store.editVsPlay !== 1 ?
        <Background intervalSet={store.intervalSet}/>
        : null
      }
      {/* <ChordPolygons
        ordinalChordsPlayed={props.ordinalChordsPlayed}
        rotation={props.rotation}
        // TODO replace this with lighting
      /> */}
      <SwarmOfChords
        ordinalChordSets={ordinalChordSets}
        rotation={props.rotation}
      />
    </g>
  );
});
