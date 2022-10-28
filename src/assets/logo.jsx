import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    width={17.561}
    height={9.287}
    viewBox="0 0 4.646 2.457"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="a">
        <stop
          style={{
            stopColor: '#0ff',
            stopOpacity: 1,
          }}
          offset={0}
        />
        <stop
          style={{
            stopColor: '#f0f',
            stopOpacity: 1,
          }}
          offset={1}
        />
      </linearGradient>
      <linearGradient
        xlinkHref="#a"
        id="b"
        x1={55.504}
        y1={75.099}
        x2={60.15}
        y2={75.099}
        gradientUnits="userSpaceOnUse"
      />
    </defs>
    <text
      xmlSpace="preserve"
      style={{
        fontSize: '3.175px',
        fill: 'url(#b)',
        strokeWidth: 0.264583,
      }}
      x={55.215}
      y={76.283}
      transform="translate(-55.504 -73.87)"
    >
      <tspan
        style={{
          fill: 'url(#b)',
          strokeWidth: 0.264583,
        }}
        x={55.215}
        y={76.283}
      >
        {'mb'}
      </tspan>
    </text>
  </svg>
);

export default SvgComponent;
