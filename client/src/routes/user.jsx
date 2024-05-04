import { getUserById } from "../services/user";
import { useLoaderData } from "react-router-dom";
import ArtworkPreview from "../components/ArtworkPreview";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
  return { user };
};

const User = () => {
  const { user } = useLoaderData();
  const imageUrl = user.picture ? import.meta.env.VITE_STRAPI_URL + user.picture.url : '/default-avatar.jpeg'
  const createdAt = new Date(user.createdAt).toLocaleDateString();

  const countTags = (artworks) => {
    const tagCounts = artworks.reduce((acc, artwork) => {
      const tags = artwork.tags ? artwork.tags.split(',').map(tag => tag.trim()) : []; //github copilot
      tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  };

  const tagsWithCounts = countTags(user.artworks);

  return (
    <>
      <div className="user-details">
        <img src={imageUrl} alt="avatar" className="large-profile-pic" />
        <div className="user-heading">
          <h2>{user.username}</h2>
          <p>User since <span>{createdAt}</span></p>
          <p>{user.username}'s email <span>{user.email}</span></p>
          {tagsWithCounts.length > 0 && (
          <div className="most-used-tags">
            <h3>Most Used Tags</h3>
            <div className="tags">
              {tagsWithCounts.map(([tag, count]) => (
                <div key={tag} className="tag">
                  {tag} ({count})
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
      <section>
        <h2>{user.username}'s Artworks</h2>
        <ul>
          <div className="artworks-collection">
            {user.artworks.map((artwork) => (
              <ArtworkPreview key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </ul>
      </section>
    </>
  );
};

User.loader = loader;
export default User;
