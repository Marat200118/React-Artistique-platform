//artworkDetail.jsx

import { getArtworkById } from "../services/artwork";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import LinePatternGenerator from "../components/LinePatternGenerator";
import { getMe } from "../services/auth";
import { deleteArtwork } from "../services/artwork";
import ArtworkPreview from "../components/ArtworkPreview";

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
  const tagsArray = artwork.tags ? artwork.tags.split(',').map(tag => tag.trim()) : [];
  const isOwner = profile.id === artwork.owner?.data?.id;
  const createdAt = new Date(artwork.createdAt).toLocaleDateString();
  const navigate = useNavigate();
  console.log('Artwork:', artwork);

   const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      await deleteArtwork(artwork.id);
      navigate('/auth/profile');
      console.log('Artwork deleted');
    }
  };

  return (
    <>
      <div className="artwork-datail">
        <h1>{name}</h1>
        <div className="flex-detail">
          <div className="artwork-owner-detail">
            <div className="tags">
              {
                artwork.tags ? <h3>Tags:</h3> : ''
              }
              <div className="tags-ul">
                {tagsArray.map((tag, index) => (
                  <div key={index} className="tag">{tag}</div>
                ))}
              </div>
            </div>
            <div className="avatar-edit-wrapper">
              <div className="owner-avatar">
                <img src={ownerPicture} alt="avatar" className="owner-profile-picture" />
                {
                  artwork.owner.data && 
                  <p>
                   <Link to={ownerUsername ? `/user/${artwork.owner.data.id}` : '/'}>{ownerUsername ? ownerUsername : 'Anonymous'}</Link>
                  </p>
                }
              </div>
              <p className="created-info">{createdAt}</p>
              {isOwner && (
                <div className="artwork-actions">
                  <button onClick={() => navigate(`/edit-artwork/${artwork.id}`)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>
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
      <div className="other-artworks">
        <h2>More Artworks by {ownerUsername}</h2>
        <div className="artworks-collection">
          {profile.artworks.map((artwork) => (
            <ArtworkPreview key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </>
  );
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;