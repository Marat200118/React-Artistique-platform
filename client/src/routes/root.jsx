import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { getAuthData } from "../services/auth";
import { getMe } from "../services/auth";

const loader = async () => {
  const user = await getAuthData();
  if ( !user.jwt) {
    return { user };
  } else {
    const profile = await getMe();
    return { user, profile };
  }
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
