//main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "./styles/style.css"; 
import Home from "./routes";
import ErrorPage from "./routes/error-page";
import CreateArtwork from "./routes/createArtwork";
import Login from "./routes/auth/login";
import { getAuthData } from './services/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => ({
      user: getAuthData() // Fetches user data from local storage or similar
    }),
    children: [
      { index: true, element: <Home /> },
      { path: "create-artwork", element: <CreateArtwork /> },
      { path: "/auth/login", element: <Login />, action: Login.action },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
