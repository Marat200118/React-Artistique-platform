// services/artwork.js
import { getToken } from "./auth";
import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
  const response = await fetchApi({
    endpoint: "artworks",
    query: { populate: ["owner"] },
  });
  if (!response || !response.data) return [];
  console.log("Artworks fetched:", response.data);
  return response.data.map(unwrapAtributes);
};

const getArtworkById = async (id) => {
  const artwork = await fetchApi({
    endpoint: `artworks/${id}`,
    query: { populate: ["owner, owner.picture"] },
    wrappedByKey: "data",
  });
  return unwrapAtributes(artwork);
};

const createArtwork = async (data) => {
  const response = await fetchApi(
    {
      endpoint: "artworks",
    },
    {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response;
};

const updateArtwork = async (id, data) => {
  const response = await fetchApi(
    {
      endpoint: `artworks/${id}`,
    },
    {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response;
};

const deleteArtwork = async (id) => {
  const response = await fetchApi(
    {
      endpoint: `artworks/${id}`,
    },
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete the artwork.");
  }
  return response;
};

export {
  getArtworkById,
  createArtwork,
  getArtworks,
  deleteArtwork,
  updateArtwork,
};
