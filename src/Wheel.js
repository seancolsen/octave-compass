import React from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";

export default function Wheel(props) {
  return (
    <svg viewBox={'-100 -100 200 200'}>
      <Keyboard/>
      <Scale/>
    </svg>
  );
}
