//artworkDetail.jsx

import { getArtworkById } from "../services/artwork";
import { useLoaderData, Link } from "react-router-dom";
import LinePatternGenerator from "../components/LinePatternGenerator";

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);
  return { artwork };
}

const ArtworkDetail = () => {

  const { artwork } = useLoaderData();
  const { strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name } = artwork;
  const ownerUsername = artwork.owner?.data?.attributes?.username;
  const ownerPictureUrl = artwork.owner?.data?.attributes?.picture?.data?.attributes?.url;
  const ownerPicture = ownerPictureUrl ? `${import.meta.env.VITE_STRAPI_URL}${ownerPictureUrl}` : '/default-avatar.jpeg';
  return (
    <>
      <div>
        <h1>{name}</h1>
        <div className="artwork-owner-detail">
          <img src={ownerPicture} alt="avatar" className="owner-profile-picture" />
          {
            artwork.owner.data && 
            <p>
              Owner: <Link to={ownerUsername ? `/user/${artwork.owner.data.id}` : '/'}>{ownerUsername ? ownerUsername : 'Anonymous'}</Link>
            </p>
          }
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
    </>
  );
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;