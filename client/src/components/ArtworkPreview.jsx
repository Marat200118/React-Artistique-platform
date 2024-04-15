import React from 'react';
import PropTypes from 'prop-types';
import LinePatternGenerator from './LinePatternGenerator';

const ArtworkPreview = ({ artwork }) => {
  const { strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name } = artwork;

  let parsedStarsAttributes = starsAttributes;

  if (typeof starsAttributes === 'string') {
    try {
      parsedStarsAttributes = JSON.parse(starsAttributes);
    } catch (error) {
      console.error('Failed to parse starsAttributes:', error);
      parsedStarsAttributes = [];
    }
  }

  return (
    <div className="artwork-preview">
      <LinePatternGenerator
        strokeWidth={strokeWidth}
        startColor={startColor}
        endColor={endColor}
        svgBackgroundColor={svgBackgroundColor}
        starsAttributes={parsedStarsAttributes}
        previewMode={true}
      />
      <p>{name}</p>
    </div>
  );
};



ArtworkPreview.propTypes = {
  artwork: PropTypes.shape({
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
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtworkPreview;
