// root.jsx

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { getAuthData } from "../services/auth";

const loader = async () => {
  const user = await getAuthData();
  console.log("Loaded user:", user);
  // const isAuthenticated = user && user.jwt ? true : false;
  // return { user: { ...user.user, isAuthenticated } };
  return { user };
};

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

Root.loader = loader;

export default Root;
