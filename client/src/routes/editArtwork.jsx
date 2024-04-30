import React, { useState } from 'react';
import { useNavigate, useLoaderData, Link, Form, redirect } from 'react-router-dom';
import { getArtworkById, updateArtwork } from '../services/artwork';
import LinePatternGenerator from '../components/LinePatternGenerator';
import Controller from '../components/Controller';
import { getAuthData } from '../services/auth';

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);
  const { user } = getAuthData();

  if (artwork.owner.data.id !== user.id) {
    return redirect('/');
  }

  return { artwork, user };
};

const EditArtwork = () => {
  const { artwork } = useLoaderData();
  const navigate = useNavigate();
  const [svg, setSvg] = useState({
    name: artwork.name,
    strokeWidth: artwork.strokeWidth,
    startColor: artwork.startColor,
    endColor: artwork.endColor,
    svgBackgroundColor: artwork.svgBackgroundColor,
    starsAttributes: JSON.parse(artwork.starsAttributes || '[]'),
    angle: artwork.angle,
    lineCount: artwork.lineCount
  });


  const onColorChange = (colorType, color) => {
    setSvg(prevSvg => ({ ...prevSvg, [colorType]: color }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSvg(prevSvg => ({ ...prevSvg, [name]: value }));
  };


  const handleSliderChange = (property, value) => {
    const numericValue = Number(value);
    setSvg(prevSvg => ({ ...prevSvg, [property]: numericValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedArtwork = {
      ...svg,
      starsAttributes: JSON.stringify(svg.starsAttributes)
    };

    try {
      await updateArtwork(artwork.id, updatedArtwork);
      navigate(`/artwork/detail/${artwork.id}`);
    } catch (error) {
      console.error('Failed to update artwork:', error);
    }
  };

  return (
    <div>
      <h1>Edit Artwork</h1>
      <Form onSubmit={handleSubmit}>
        <div className='pattern-controlls-container'>
          <LinePatternGenerator
            strokeWidth={svg.strokeWidth}
            startColor={svg.startColor}
            endColor={svg.endColor}
            svgBackgroundColor={svg.svgBackgroundColor}
            starsAttributes={svg.starsAttributes}
            previewMode={false}
          />
          <div className='pattern-controlls'>
            <input
              type="text"
              name="name"
              placeholder="Enter artwork name"
              value={svg.name}
              onChange={handleInputChange}
              required
            />
            <Controller
              angle={svg.angle}
              strokeWidth={svg.strokeWidth}
              lineCount={svg.lineCount}
              startColor={svg.startColor}
              endColor={svg.endColor}
              onSliderChange={handleSliderChange}
              onColorChange={onColorChange}
            />
            <div className='buttons'>
              <button type="submit">Save Changes</button>
              <Link to={`/artwork/detail/${artwork.id}`}>Cancel</Link>
            </div>
  
          </div>
        </div>

      </Form>
      
    </div>
  );
};

EditArtwork.loader = loader;

export default EditArtwork;
