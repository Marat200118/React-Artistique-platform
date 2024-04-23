import React from 'react';
import { useNavigate } from 'react-router-dom';
import GeneratorModule from '../components/GeneratorModule';

const CreateArtwork = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      angle: formData.get('angle'),
      strokeWidth: formData.get('strokeWidth'),
      lineCount: formData.get('lineCount'),
      startColor: formData.get('startColor'),
      endColor: formData.get('endColor'),
      name: formData.get('name'),
      starsAttributes: formData.getAll('starsAttributes'), // Assuming starsAttributes is an array
      svgBackgroundColor: formData.get('svgBackgroundColor')
    };
    
    try {
      await GeneratorModule.saveArtworkToBackend(data);
      navigate('/');
    } catch (error) {
      console.error('Failed to create artwork:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <GeneratorModule />
      <input type="submit" value="Save Artwork" />
    </form>
  );
};

export default CreateArtwork;
