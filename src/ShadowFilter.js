import React from 'react';

export default function ShadowFilter(props) {
  return (
    <filter id="drop-shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
      <feOffset dx="0" dy="0" result="offsetblur"/>
      <feFlood floodColor="#000"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  );
}
