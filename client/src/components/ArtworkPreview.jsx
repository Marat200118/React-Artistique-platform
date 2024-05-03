//ArtworkPreview.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLoaderData, useNavigate} from 'react-router-dom';
import LinePatternGenerator from './LinePatternGenerator';
import { getAuthData } from '../services/auth';


const ArtworkPreview = ({ artwork }) => {
  const { id, strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name, owner } = artwork;

  const parsedStarsAttributes = typeof starsAttributes === 'string' ? JSON.parse(starsAttributes) : starsAttributes;

  const ownerUsername = owner?.data?.attributes?.username;
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
    <div className="artwork-preview" onClick={handleDetailNavigation}>
      {/* <Link to={`/artwork/detail/${id}`}> */}
        <LinePatternGenerator
          strokeWidth={strokeWidth}
          startColor={startColor}
          endColor={endColor}
          svgBackgroundColor={svgBackgroundColor}
          starsAttributes={parsedStarsAttributes}
          previewMode={true}
          id={`artwork-${id}`}
        />
      {/* </Link> */}
      <div className='artwotk-previe-details'>
        <div className='first-line'>
          <p>{name}</p>
          {ownerUsername && <p>  <Link to = {ownerUsername ? `/user/${owner.data.id}` : '/'}> {ownerUsername ? ownerUsername : 'Anonymous'}</Link></p>}
        </div>
        {/* <div className='second-line'>
          {ownerUsername && <p>  <Link to = {ownerUsername ? `/user/${owner.data.id}` : '/'}> {ownerUsername ? ownerUsername : 'Anonymous'}</Link></p>}
          <img src={ownerPictureUrl ? import.meta.env.VITE_STRAPI_URL + ownerPictureUrl : '/default-avatar.jpeg'} alt="avatar" className="owner-picture-xxs" />
          
        </div> */}
      </div>

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
