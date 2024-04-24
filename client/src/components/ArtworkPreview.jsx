//ArtworkPreview.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinePatternGenerator from './LinePatternGenerator';


const ArtworkPreview = ({ artwork }) => {
  const { id, strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name } = artwork;
  // console.log(startColor, endColor);

  const parsedStarsAttributes = typeof starsAttributes === 'string' ? JSON.parse(starsAttributes) : starsAttributes;


  return (
    <div className="artwork-preview">
      <Link to={`/artwork/detail/${id}`}>
        <LinePatternGenerator
          strokeWidth={strokeWidth}
          startColor={startColor}
          endColor={endColor}
          svgBackgroundColor={svgBackgroundColor}
          starsAttributes={parsedStarsAttributes}
          previewMode={true}
          id={`artwork-${artwork.id}`} // Ensure unique id for each artwork
        />
        <p>{name}</p>
      </Link>
    </div>
  );
};

ArtworkPreview.propTypes = {
  artwork: PropTypes.shape({
    strokeWidth: PropTypes.number.isRequired,
    startColor: PropTypes.string.isRequired,
    endColor: PropTypes.string.isRequired,
    svgBackgroundColor: PropTypes.string.isRequired,
    starsAttributes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape({
        x1: PropTypes.number.isRequired,
        y1: PropTypes.number.isRequired,
        x2: PropTypes.number.isRequired,
        y2: PropTypes.number.isRequired,
      }))
    ]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtworkPreview;
