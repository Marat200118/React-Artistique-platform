//user.jsx

import { useLoaderData } from 'react-router-dom';
import { getUserById } from '../services/user.js';

const loader = async ({ params }) => {
  const { id } = params;
  const user = await getUserById(id);
  return { user };
}


const User = () => {

  const user = useLoaderData();

  return (
    <div>
      <h1>User</h1>
      <dl>
        <dt>Name</dt>
        <dd>{user.username}</dd>
      </dl>
    </div>
  );
}

User.loader = loader;
export default User;