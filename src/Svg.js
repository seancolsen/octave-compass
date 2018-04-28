import React from 'react';

import Keyboard from "./Keyboard";
import Scale from "./Scale";

function Svg(props) {

  return (
    <svg viewBox={'-100 -100 200 200'}>
      <Keyboard/>
      <Scale/>
    </svg>
  )
}

export default Svg;
