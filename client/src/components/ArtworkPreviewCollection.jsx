import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate} from 'react-router-dom';
import LinePatternGenerator from './LinePatternGenerator';
import { getAuthData } from '../services/auth';

const ArtworkPreviewCollection = ({ artwork }) => {
  const { id, strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name, owner } = artwork;
  const parsedStarsAttributes = typeof starsAttributes === 'string' ? JSON.parse(starsAttributes) : starsAttributes;
  const ownerUsername = owner?.data?.attributes?.username;
  const ownerPictureUrl = owner?.data?.attributes?.picture?.data?.attributes?.url;
  const loggedInUser = getAuthData();
  const navigate = useNavigate();

  const handleDetailNavigation = () => {
    if (loggedInUser && loggedInUser.user) {
      navigate(`/artwork/detail/${id}`);
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="artwork-preview">
      <div className='artwork-preview-pattern' onClick={handleDetailNavigation}>
        <LinePatternGenerator
          strokeWidth={strokeWidth}
          startColor={startColor}
          endColor={endColor}
          svgBackgroundColor={svgBackgroundColor}
          starsAttributes={parsedStarsAttributes}
          previewMode={true}
          id={`artwork-${id}`}
          onClick={handleDetailNavigation}
        />
      </div>
      <div className='artwotk-preview-details'>
        <div className='first-line'>
          <p>{name}</p>
          {ownerUsername && (
            <Link to={`/user/${owner?.data?.id}`}>
              <img
                src={ownerPictureUrl ? import.meta.env.VITE_STRAPI_URL + ownerPictureUrl : '/default-avatar.jpeg'}
                alt="avatar"
                className="owner-picture-xxs"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

ArtworkPreviewCollection.propTypes = {
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

export default ArtworkPreviewCollection;
