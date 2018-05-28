import React from 'react';
import styled from 'styled-components';

function Notation(props) {
  return (
    <div id='notation' className={props.className}>
      Notation
    </div>
  );
}

export default styled(Notation)`
  background: white;
`;
