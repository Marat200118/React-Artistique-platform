import React from 'react';
import PropTypes from 'prop-types';

const LinePatternGenerator = ({ strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes }) => {
  const lineElements = starsAttributes.map((attr, i) => {
    const { x1, y1, x2, y2 } = attr;
    const fadedEndColor = endColor + '1A';
    const gradientId = `gradient${i}`;

    const gradient = (
      <linearGradient key={gradientId} id={gradientId} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
        <stop offset="0%" stopColor={startColor} stopOpacity="1" />
        <stop offset="50%" stopColor={endColor} stopOpacity="1" />
        <stop offset="100%" stopColor={fadedEndColor} stopOpacity="0" />
      </linearGradient>
    );

    const line = (
      <line
        key={i}
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );

    return { line, gradient };
  });

  return (
    <svg
      viewBox="0 0 120 100" 
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      style={{ backgroundColor: svgBackgroundColor }}
    >
      <defs>
        {lineElements.map(({ gradient }) => gradient)}
      </defs>
      {lineElements.map(({ line }) => line)}
    </svg>
  );
};

LinePatternGenerator.propTypes = {
  strokeWidth: PropTypes.number.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
  svgBackgroundColor: PropTypes.string.isRequired,
  starsAttributes: PropTypes.arrayOf(PropTypes.shape({
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
  })).isRequired,
};

export default LinePatternGenerator;
