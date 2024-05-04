import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ArtworkPreviewCollection from '../components/ArtworkPreviewCollection';
import { getArtworks } from '../services/artwork';
import { getAuthData } from '../services/auth';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const loader = async () => {
  const artworks = await getArtworks();
  const user = await getAuthData();
  return { artworks, user };
}

const ArtworksCollection = () => {
  const { artworks } = useLoaderData();
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 20;

  const tags = artworks.reduce((acc, artwork) => {
    const artworkTags = artwork.tags ? artwork.tags.split(',').map(tag => tag.trim()) : [];
    artworkTags.forEach(tag => {
      if (tag && !acc.includes(tag)) { 
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  //  console.log('Available tags:', tags);  // Check what tags are available

  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
    // setCurrentPage(1);
  }

  const filteredArtworks = selectedTag ? artworks.filter(artwork => artwork.tags && artwork.tags.includes(selectedTag)) : artworks;
  // console.log('Filtered artworks count:', filteredArtworks.length); 

  // const indexOfLastArtwork = currentPage * artworksPerPage;
  // const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  // const currentArtworks = filteredArtworks.slice(indexOfFirstArtwork, indexOfLastArtwork);

  // console.log('Artworks on current page:', currentArtworks.length);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
      {/* <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='pagination-button'>
          <FiArrowLeft />
        </button>
        <span className='pagination-num'>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredArtworks.length / artworksPerPage)} className='pagination-button'>
          <FiArrowRight />
        </button>
      </div> */}
    </section>
  );
}

ArtworksCollection.loader = loader;

export default ArtworksCollection;
