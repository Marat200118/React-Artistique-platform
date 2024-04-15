import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <header>
        <h1>Falling Stars Pattern Generator</h1>
      </header>
      <main>
        <Outlet /> {/* This will render the currently matched child route component. */}
      </main>
    </>
  );
};

export default Root;
