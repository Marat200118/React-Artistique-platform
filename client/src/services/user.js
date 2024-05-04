import { fetchApi } from "./strapi";

const getUsers = async () => {
  const users = await fetchApi({
    endpoint: "users",
    query: { populate: ["artworks", "picture"] },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await fetchApi({
    endpoint: `users/${id}`,
    query: { populate: ["artworks", "picture"] },
  });
  return user;
};

export { getUserById, getUsers };
