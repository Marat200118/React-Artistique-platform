import { getUserById } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
  return { user };
};

const User = () => {
  const { user } = useLoaderData();
  return (
    <>
      <h2>{user.username}</h2>
      <p>User since {user.createdAt}</p>

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
