import React from 'react';
import PropTypes from 'prop-types';

const LinePatternGenerator = ({ strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, previewMode }) => {
  const scale = previewMode ? 1 : 1; // Adjust scale for preview
  const viewBoxWidth = 120 * scale;
  const viewBoxHeight = 100 * scale;
  const lineElements = (starsAttributes || []).map((attr, i) => {
    const { x1, y1, x2, y2 } = attr;
    const fadedEndColor = `${endColor}1A`; // Append alpha if needed
    const gradientId = `gradient${i}`;

    return {
      line: (
        <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
          stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinecap="round"
        />
      ),
      gradient: (
        <linearGradient key={gradientId} id={gradientId} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0%" stopColor={startColor} stopOpacity="1" />
          <stop offset="50%" stopColor={endColor} stopOpacity="1" />
          <stop offset="100%" stopColor={fadedEndColor} stopOpacity="0" />
        </linearGradient>
      )
    };
  });
 

  return (
   <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
      preserveAspectRatio="xMidYMid meet"
      width={previewMode ? '60px' : '100%'} // Adjust svg width for preview
      height={previewMode ? '50px' : '100%'} // Adjust svg height for preview
      style={{ backgroundColor: svgBackgroundColor, border: previewMode ? '1px solid #ddd' : '' }} // Optional border for preview
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
  previewMode: PropTypes.bool,
};

export default LinePatternGenerator;
