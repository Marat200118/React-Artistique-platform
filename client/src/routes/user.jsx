//user.jsx

import { getUserById } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
  return { user };
};

const User = () => {
  const { user } = useLoaderData();
  const imageUrl = user.picture ? import.meta.env.VITE_STRAPI_URL + user.picture.url : '/default-avatar.jpeg'
  return (
    <>
      <h2>{user.username}</h2>
      <p>User since {user.createdAt}</p>
      <img src={imageUrl} alt="avatar" className="large-profile-pic" />

      <section>
        <h3>Artworks</h3>
        <ul>
          {user.artworks.map((artwork) => (
            <li key={artwork.id}>
              <Link to={`/artwork/detail/${artwork.id}`}>{artwork.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

User.loader = loader;

export default User;
