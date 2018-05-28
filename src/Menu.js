import React from 'react';
import styled from 'styled-components';

function Menu(props) {
  return (
    <div className={props.className} id='menu'>
      Menu
    </div>
  );
}

export default styled(Menu)`
  background: #aaa;
`;
