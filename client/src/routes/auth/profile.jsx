//profile.jsx

import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getMe } from "../../services/auth";
import ArtworkPreview from "../../components/ArtworkPreview";

const loader = async () => {
  const profile = await getMe();
  return { profile };
};

const Profile = () => {
  const { profile } = useLoaderData();
  return (
    <article>
      <h1>Profile</h1>
      <p>Username: {profile.username}</p>
      <h2>My Artworks</h2>
      <ul>
        {profile.artworks.map((artwork) => (
          <li key={artwork.id}>
            {/* Remove the Link here, ArtworkPreview should handle its own linking */}
            <ArtworkPreview key={artwork.id} artwork={artwork} />
          </li>
        ))}
      </ul>
    </article>
  );
};


Profile.loader = loader;
export default Profile;
