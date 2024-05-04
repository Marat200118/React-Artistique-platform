import { getUsers } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";

const loader = async () => {
  const users = await getUsers();
  return { users };
};

const Users = () => {

  const { users } = useLoaderData();

  return (
    <div>
      <h1>Users</h1>
      <div className="users-collection">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p>User since {new Date(user.createdAt).toLocaleDateString()}</p>
            <img src={user.picture ? import.meta.env.VITE_STRAPI_URL + user.picture.url : '/default-avatar.jpeg'} alt="avatar" className="profile-pic" />
            <button className='saveArtworkButton'>
              <Link to={`/user/${user.id}`}>View Profile</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

Users.loader = loader;

export default Users;