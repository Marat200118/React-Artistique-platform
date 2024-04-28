//artworksCollection.jsx

import '../styles/style.css';
import {Form, redirect, useLoaderData, Link } from 'react-router-dom';
import ArtworkPreview from '../components/ArtworkPreview';
import { getArtworks } from '../services/artwork';
import { getAuthData } from '../services/auth';

const loader = async () => {
  const artworks = await getArtworks();
  const user = await getAuthData();
  console.log("Loaded artworks:", artworks);
  return { artworks, user };
}

const ArtworksCollection = () => {

  const { artworks } = useLoaderData();
  return (
    <section>
      <h1>Artworks Collection</h1>
      <div className="artworks-collection">
        {artworks.map((artwork) => (
          <ArtworkPreview key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

ArtworksCollection.loader = loader;

export default ArtworksCollection;