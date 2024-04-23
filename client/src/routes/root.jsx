// root.jsx

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { getAuthData } from "../services/auth";

const loader = async () => {
  const user = getAuthData();
  return { user };
};

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the currently matched child route component. */}
      </main>
    </>
  );
};

Root.loader = loader;

export default Root;
