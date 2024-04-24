//ArtworkPreview.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinePatternGenerator from './LinePatternGenerator';
import { getArtworkById } from '../services/artwork';


const ArtworkPreview = ({ artwork }) => {
  const { id, strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name, owner } = artwork;

  const parsedStarsAttributes = typeof starsAttributes === 'string' ? JSON.parse(starsAttributes) : starsAttributes;

   const ownerUsername = owner?.data?.attributes?.username;


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
          id={`artwork-${id}`}
        />
        <p>{name}</p>
        {ownerUsername && <p>Owner: {ownerUsername}</p>}
      </Link>
    </div>
  );
};

ArtworkPreview.propTypes = {
  artwork: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    owner: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default ArtworkPreview;
