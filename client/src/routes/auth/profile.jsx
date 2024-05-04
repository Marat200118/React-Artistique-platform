import React from "react";
import { useLoaderData } from "react-router-dom";
import { getMe } from "../../services/auth";
import ArtworkPreview from "../../components/ArtworkPreview";

const loader = async () => {
  const profile = await getMe();
  return { profile };
};

const Profile = () => {
  const { profile } = useLoaderData();
  const createdAt = new Date(profile.createdAt).toLocaleDateString();
  
  return (
    <article>
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-picture">
          <img src={profile.picture ? import.meta.env.VITE_STRAPI_URL + profile.picture.url : '/default-avatar.jpeg'} alt="Profile avatar" className="large-profile-pic" />
        </div>
        <div className="profile-text">
          <p>Username: <span>{profile.username}</span></p>
          <p>Email: <span>{profile.email}</span></p>
          <p>Member since: <span>{createdAt}</span></p>
        </div>
      </div>
      <h2>My Artworks</h2>
      <div className="my-artworks">
        {profile.artworks.map((artwork) => (
          <ArtworkPreview key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </article>
  );
};


Profile.loader = loader;
export default Profile;
