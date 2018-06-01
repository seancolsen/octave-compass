import React from 'react';

export default function ShadowFilter(props) {
  const bounds = props.bounds || 1.2;
  return (
    <filter
      id={props.id}
      x={-(bounds - 1) / 2}
      y={-(bounds - 1) / 2}
      width={bounds}
      height={bounds}
    >
      <feGaussianBlur in="SourceAlpha" stdDeviation={props.size}/>
      <feOffset dx="0" dy="0" result="offsetblur"/>
      <feFlood floodColor={props.color}/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  );
}
