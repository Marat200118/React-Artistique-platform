//ArtworkPreview.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLoaderData } from 'react-router-dom';
import LinePatternGenerator from './LinePatternGenerator';
import { deleteArtwork } from '../services/artwork';
import { getAuthData } from '../services/auth';


const ArtworkPreview = ({ artwork }) => {
  const { id, strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name, owner } = artwork;

  const parsedStarsAttributes = starsAttributes ? (typeof starsAttributes === 'string' ? JSON.parse(starsAttributes) : starsAttributes) : [];

  const ownerUsername = owner?.data?.attributes?.username;
  const loggedInUser = getAuthData();
  const isOwner = loggedInUser?.user?.id === owner?.data?.id;
  // console.log('isOwner', isOwner);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteArtwork(id);
        window.location.reload(); 
      } catch (error) {
        console.error('Failed to delete artwork:', error);
      }
    }
  };

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
          {/* {isOwner && (
          <>
            <div className='edit-delete-buttons'>
              <Link to={`/edit-artwork/${artwork.id}`} className='log-in-helper'>Edit</Link>
              <button onClick={() => handleDelete(artwork.id)} className='delete-button'>Delete</button>
            </div>
          </>
        )} */}     
      </Link>
      <p>{name}</p>
      {ownerUsername && <p>Owner:  <Link to = {ownerUsername ? `/user/${owner.data.id}` : '/'}> {ownerUsername ? ownerUsername : 'Anonymous'}</Link></p>}
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
      })),
    ]).isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default ArtworkPreview;
