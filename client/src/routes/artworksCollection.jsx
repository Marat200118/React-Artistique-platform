import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ArtworkPreviewCollection from '../components/ArtworkPreviewCollection';
import { getArtworks } from '../services/artwork';
import { getAuthData } from '../services/auth';

const loader = async () => {
  const artworks = await getArtworks();
  const user = await getAuthData();
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

  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
  }

  const filteredArtworks = selectedTag ? artworks.filter(artwork => artwork.tags && artwork.tags.includes(selectedTag)) : artworks;
  return (
    <section>
      <h1>Artworks Collection</h1>
      <div className="tags-list">
        {tags.map((tag, index) => (
          <button key={index} onClick={() => handleTagSelection(tag)} className="tag-button">
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
          <ArtworkPreviewCollection key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

ArtworksCollection.loader = loader;

export default ArtworksCollection;
