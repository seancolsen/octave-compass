import React from 'react';
import ChordSelection from "components/Menu/ChordSelection";
import styled from 'styled-components';

function Menu(props) {

  return (
    <div className={props.className} id='menu'>
      <ChordSelection
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}

export default styled(Menu)`
  overflow: scroll;
`;