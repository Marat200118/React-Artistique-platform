//CreateArtwork.jsx

import React, { useState } from 'react';
import '../styles/style.css';
import LinePatternGenerator from '../components/LinePatternGenerator';
import Controller from '../components/Controller'; 
import {Form, redirect, useLoaderData} from 'react-router-dom';
import { createArtwork, getArtworks } from '../services/artwork';
import '../components/ArtworkPreview';
import ArtworkPreview from '../components/ArtworkPreview';


const action = async ({ request }) => {
  const formData = await request.formData();
  const data = JSON.parse(formData.get('data'));

  const payload = {
    angle: data.angle,
    strokeWidth: data.strokeWidth,
    lineCount: data.lineCount,
    startColor: data.startColor,
    endColor: data.endColor,
    starsAttributes: JSON.stringify(data.starsAttributes),
    name: `Artwork_${Date.now()}`,
    svgBackgroundColor: data.svgBackgroundColor
  };

  console.log("Sending payload:", payload);
  await createArtwork(payload);
  return redirect('/create-artwork');
}

const loader = async () => {
  const artworks = await getArtworks();
  console.log("Loaded artworks:", artworks);
  return { artworks };
};

  const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const color1 = getRandomColor();
  const color2 = getRandomColor();


const CreateArtwork = () => {

  // const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
  
  const [svg, setSvg] = useState ({
    strokeWidth: getRandomInRange(0.05, 1),
    lineCount: Math.round(Math.random() * 150),
    angle: Math.round(Math.random() * 360),
    startColor: color1,
    endColor: color2,
    theme: 'dark',
    svgBackgroundColor: '#1C1D1E',
  });

  const switchTheme = () => {
    const newTheme = svg.theme === 'dark' ? 'light' : 'dark';
    const newBackgroundColor = newTheme === 'dark' ? '#1C1D1E' : '#F2F2F2';
    setSvg(prevSvg => ({
      ...prevSvg,
      theme: newTheme,
      svgBackgroundColor: newBackgroundColor
    }));
  };

  const generateStarsAttributes = (count) => {
    return Array.from({ length: count }, () => {
      const x1 = Math.random() * 120 - 10; 
      const y1 = Math.random() * 100; 
      const lineLength = getRandomInRange(30, 100); 
      const angleRad = svg.angle * (Math.PI / 180); 
      const x2 = x1 + lineLength * Math.cos(angleRad);
      const y2 = y1 + lineLength * Math.sin(angleRad);
      return { x1, y1, x2, y2, originalLength: lineLength };
    });
  };

  const [starsAttributes, setStarsAttributes] = useState(() => generateStarsAttributes(Math.round(Math.random() * 150)));

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

  const handleSliderChange = (property, value) => {
    const numericValue = Number(value);
    if (property === 'lineCount') {
      handleLineCountChange(numericValue);
    } else {
      setSvg(prevSvg => ({ ...prevSvg, [property]: numericValue }));
      if (property === 'angle') {
       
        setStarsAttributes(stars => stars.map(star => {
          const lineLength = getRandomInRange(30, 100);
          const angleRad = numericValue * (Math.PI / 180);
          const x2 = star.x1 + lineLength * Math.cos(angleRad);
          const y2 = star.y1 + lineLength * Math.sin(angleRad);
          return { ...star, x2, y2, originalLength: lineLength };
        }));
      }
    }
  };

  const onColorChange = (colorType, color) => {
    setSvg(prevSvg => ({ ...prevSvg, [colorType]: color }));
  };
 
  const { strokeWidth, lineCount, angle, startColor, endColor, theme } = svg;
  const svgBackgroundColor = svg.theme === 'dark' ? '#1C1D1E' : '#F2F2F2';
  const textColor = svg.theme === 'dark' ? '#F7F7F7' : '#1C1D1E';


  const { artworks } = useLoaderData();
  return (
    <>
    <div className="Generator-module" style={{ color: textColor }}>
      <div className='pattern-controlls-container'>
        <LinePatternGenerator
          strokeWidth={svg.strokeWidth}
          startColor={svg.startColor}
          endColor={svg.endColor}
          svgBackgroundColor={svg.svgBackgroundColor}
          starsAttributes={starsAttributes}
        />
        <div className='pattern-controlls'>
          <Controller
            angle={angle}
            strokeWidth={strokeWidth}
            lineCount={lineCount}
            startColor={startColor}
            endColor={endColor}
            onSliderChange={handleSliderChange}
            onColorChange={onColorChange}
          />

          <div className='buttons'>
            <button onClick={switchTheme} className='switchThemeButton'>Switch Theme</button>
            <Form method="POST">
              <input type="hidden" name="data" value={JSON.stringify({...svg, starsAttributes})} readOnly={true} />
              <button className='saveArtworkButton' type='submit'>Save Artwork</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    
    <div className='saved-artworks'>
      <h2>Saved Artworks</h2>
      <div className='artworks-container'>
        {artworks.map(artwork => (
          <ArtworkPreview key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>


    </>
  );
}


CreateArtwork.action = action;
CreateArtwork.loader = loader;

export default CreateArtwork;


