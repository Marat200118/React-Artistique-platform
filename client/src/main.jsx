//main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes/index";
import "./styles/style.css"; 
import ErrorPage from "./routes/error-page";
import CreateArtwork from "./routes/createArtwork";
import Login from "./routes/auth/login";
import { getAuthData } from './services/auth';

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      { index: true, element: <Index /> },
      { 
        path: "create-artwork",
        element: <CreateArtwork /> 
      },
      { 
        path: "/auth/login",
        element: <Login />, 
        action: Login.action 
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
