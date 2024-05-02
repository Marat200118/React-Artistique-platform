import React, { useState } from 'react';
import '../styles/style.css';
import { useLoaderData, Link } from 'react-router-dom';
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
  const [selectedTag, setSelectedTag] = useState(null);

  const tags = artworks.reduce((acc, artwork) => {
    const artworkTags = artwork.tags ? artwork.tags.split(',').map(tag => tag.trim()) : [];
    artworkTags.forEach(tag => {
      if (tag && !acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  const filteredArtworks = selectedTag ? artworks.filter(artwork => artwork.tags && artwork.tags.includes(selectedTag)) : artworks;

 return (
    <section>
      <h1>Artworks Collection</h1>
      <div className="tags-list list-collection">
        {tags.map((tag, index) => (
          <button key={index} onClick={() => setSelectedTag(tag)} className="tag-button">
            {tag}
          </button>
        ))}
        {selectedTag && (
          <button onClick={() => setSelectedTag('')} className="reset-button">
            Reset Filter
          </button>
        )}
      </div>
      <div className="artworks-collection">
        {filteredArtworks.map((artwork) => (
          <ArtworkPreview key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

ArtworksCollection.loader = loader;

export default ArtworksCollection;
