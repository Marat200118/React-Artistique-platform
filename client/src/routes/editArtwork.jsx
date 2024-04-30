import React, { useState } from 'react';
import { useNavigate, useLoaderData, useParams, Link, Form } from 'react-router-dom';
import { getArtworkById, updateArtwork } from '../services/artwork';
import LinePatternGenerator from '../components/LinePatternGenerator';
import Controller from '../components/Controller';

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);
  return { artwork };
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

  const [starsAttributes, setStarsAttributes] = useState(JSON.parse(artwork.starsAttributes));

  const onColorChange = (colorType, color) => {
    setSvg(prevSvg => ({ ...prevSvg, [colorType]: color }));
  };

  const generateStarsAttributes = (count) => {
    return Array.from({ length: count }, () => {
      const x1 = Math.random() * 120 - 10; 
      const y1 = Math.random() * 100; 
      const lineLength = Math.random() * (100 - 30) + 30;
      const angleRad = svg.angle * (Math.PI / 180); 
      const x2 = x1 + lineLength * Math.cos(angleRad);
      const y2 = y1 + lineLength * Math.sin(angleRad);
      return { x1, y1, x2, y2, originalLength: lineLength };
    });
  };

  const handleLineCountChange = (newCount) => {
    setSvg(prevSvg => ({ ...prevSvg, lineCount: newCount }));
    setStarsAttributes(currentStars => {
      const currentCount = currentStars.length;
      if (newCount > currentCount) {
        const additionalStars = generateStarsAttributes(newCount - currentCount);
        return [...currentStars, ...additionalStars];
      } else if (newCount < currentCount) {
        return currentStars.slice(0, newCount);
      }
      return currentStars;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSvg(prevSvg => ({ ...prevSvg, [name]: value }));
  };


  // const handleSliderChange = (property, value) => {
  //   const numericValue = Number(value);
  //   if (property === 'lineCount') {
  //     handleLineCountChange(numericValue);
  //   } else {
  //     setSvg(prevSvg => ({ ...prevSvg, [property]: numericValue }));
  //     if (property === 'angle') {
       
  //       setStarsAttributes(stars => stars.map(star => {
  //           const lineLength = Math.random() * (100 - 30) + 30;; 
  //         const angleRad = numericValue * (Math.PI / 180);
  //         const x2 = star.x1 + lineLength * Math.cos(angleRad);
  //         const y2 = star.y1 + lineLength * Math.sin(angleRad);
  //         return { ...star, x2, y2, originalLength: lineLength };
  //       }));
  //     }
  //   }
  // };

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
        <LinePatternGenerator
          strokeWidth={svg.strokeWidth}
          startColor={svg.startColor}
          endColor={svg.endColor}
          svgBackgroundColor={svg.svgBackgroundColor}
          starsAttributes={starsAttributes}
          previewMode={false}
        />
        <button type="submit">Save Changes</button>
      </Form>
      <Link to={`/artwork/detail/${artwork.id}`}>Cancel</Link>
    </div>
  );
};

EditArtwork.loader = loader;

export default EditArtwork;
