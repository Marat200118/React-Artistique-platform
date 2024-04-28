//artworkDetail.jsx

import { getArtworkById } from "../services/artwork";
import { useLoaderData } from "react-router-dom";
import LinePatternGenerator from "../components/LinePatternGenerator";

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);
  return { artwork };
}

const ArtworkDetail = () => {

  const { artwork } = useLoaderData();
  const { strokeWidth, startColor, endColor, svgBackgroundColor, starsAttributes, name } = artwork;
  return (
    <div>
      <h1>{name}</h1>
      {
        artwork.owner.data && 
        <p>
          Owner: {artwork.owner.data.attributes.username}
        </p>
      }
      <LinePatternGenerator
        strokeWidth={strokeWidth}
        startColor={startColor}
        endColor={endColor}
        svgBackgroundColor={svgBackgroundColor}
        starsAttributes={JSON.parse(starsAttributes)}
        previewMode={false}
      />
    </div>
  );
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;



// simon.vanherweghe@howest.be
// Test1234