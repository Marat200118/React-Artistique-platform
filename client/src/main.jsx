import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes/index";
import "./styles/style.css"; 
import ErrorPage from "./routes/error-page";
import CreateArtwork from "./routes/createArtwork";
import Login from "./routes/auth/login";
import ArtworkDetail from "./routes/artworkDetail";
import Profile from "./routes/auth/profile";
import Register from "./routes/auth/register";
import User from "./routes/user";
import ArtworksCollection from "./routes/artworksCollection";
import EditArtwork from "./routes/editArtwork";
import Users from "./routes/users";

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
        path: "/create-artwork",
        element: <CreateArtwork />, 
        action: CreateArtwork.action,
        loader: CreateArtwork.loader,
      },
      { 
        path: "/auth/login",
        element: <Login />, 
        action: Login.action,
      },
      {
        path: "/artwork/detail/:id",
        element: <ArtworkDetail />,
        loader: ArtworkDetail.loader,
      },
      {
        path: "/auth/profile",
        element: <Profile />,
        loader: Profile.loader,
      },
      {
        path: "/auth/register",
        element: <Register />,
        action: Register.action,
      },
      {
        path: "/user/:id",
        element: <User />,
        loader: User.loader,
      },
      {
        path: "/users",
        element: <Users />,
        loader: Users.loader,
      },
      {
        path: "/artwork-collection",
        element: <ArtworksCollection />,
        loader: ArtworksCollection.loader,
      },
      {
        path: "/edit-artwork/:id",
        element: <EditArtwork />,
        loader: EditArtwork.loader,
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
