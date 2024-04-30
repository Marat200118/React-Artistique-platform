//artworkDetail.jsx

import { getArtworkById } from "../services/artwork";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import LinePatternGenerator from "../components/LinePatternGenerator";
import { getMe } from "../services/auth";
import { deleteArtwork } from "../services/artwork";

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);
  const profile = await getMe();
  return { artwork, profile };
}

const ArtworkDetail = () => {

  const { artwork, profile } = useLoaderData();
  const { strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name } = artwork;
  const ownerUsername = artwork.owner?.data?.attributes?.username;
  const ownerPictureUrl = artwork.owner?.data?.attributes?.picture?.data?.attributes?.url;
  const ownerPicture = ownerPictureUrl ? `${import.meta.env.VITE_STRAPI_URL}${ownerPictureUrl}` : '/default-avatar.jpeg';
  const profileUsername = profile.username;
  const isOwner = profile.id === artwork.owner?.data?.id;
  const navigate = useNavigate();

   const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      await deleteArtwork(artwork.id);
      console.log('Artwork deleted');
      navigate('/');
    }
  };

  console.log(isOwner);

  if (ownerUsername === profileUsername) {
    console.log('You are the owner of this artwork');
  } else {
    console.log('You are not the owner of this artwork');
  }
  return (
    <>
      <div>
        <h1>{name}</h1>
        <div className="flex-detail">
          <div className="artwork-owner-detail">
            <div className="owner-avatar">
              <img src={ownerPicture} alt="avatar" className="owner-profile-picture" />
              {
                artwork.owner.data && 
                <p>
                  Owner: <Link to={ownerUsername ? `/user/${artwork.owner.data.id}` : '/'}>{ownerUsername ? ownerUsername : 'Anonymous'}</Link>
                </p>
              }
            </div>
            {isOwner && (
              <div className="artwork-actions">
                <button onClick={() => navigate(`/edit-artwork/${artwork.id}`)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
          <LinePatternGenerator
            strokeWidth={strokeWidth}
            startColor={startColor}
            endColor={endColor}
            svgBackgroundColor={svgBackgroundColor}
            starsAttributes={JSON.parse(starsAttributes)}
            previewMode={false}
          />
        </div>
      </div>
    </>
  );
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;