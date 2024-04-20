import React from 'react';
import { useNavigate } from 'react-router-dom';
import GeneratorModule from '../components/GeneratorModule';

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
    <GeneratorModule />
  );
};

export default CreateArtwork;
