import { getToken } from "./auth";
import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
  const response = await fetchApi({
    endpoint: "artworks",
    query: { populate: ["owner", "owner.picture"] },
  });
  if (!response || !response.data) return [];
  return response.data.map(unwrapAtributes);
};

const getArtworkById = async (id) => {
  const artwork = await fetchApi({
    endpoint: `artworks/${id}`,
    query: { populate: ["owner", "owner.picture", "owner.artworks"] },
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
  return response;
};

const randomWord = async () => {
  const url = "https://api.api-ninjas.com/v1/randomword";
  const headers = new Headers({
    "X-Api-Key": "h0chLHEl9ByoleRfG8q0bA==SjkAcGZuDZNj2nC8",
    "Content-Type": "application/json",
  });
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.word;
};

export {
  getArtworkById,
  createArtwork,
  getArtworks,
  deleteArtwork,
  updateArtwork,
  randomWord,
};
