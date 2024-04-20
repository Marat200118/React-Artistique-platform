import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { saveArtwork } from '../services/artworkService'; // You'd need to implement this

const CreateArtwork = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await saveArtwork(data);
      navigate('/'); // Navigate home or to a success page
    } catch (error) {
      console.error('Failed to create artwork:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Artwork Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" required />

      <button type="submit">Create Artwork</button>
    </form>
  );
};

export default CreateArtwork;
