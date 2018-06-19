import React from 'react';

export default function BlurFilter(props) {
  const bounds = props.bounds || 1.2;
  return (
    <filter
      id={props.id}
      x={-(bounds - 1) / 2}
      y={-(bounds - 1) / 2}
      width={bounds}
      height={bounds}
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation={props.size}/>
    </filter>
  );
}
