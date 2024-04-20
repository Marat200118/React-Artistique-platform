import { Outlet } from "react-router-dom";
import Header from "../components/Header";

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

export default Root;
