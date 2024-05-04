import React, { useState } from 'react';
import '../styles/style.css';
import LinePatternGenerator from '../components/LinePatternGenerator';
import Controller from '../components/Controller'; 
import {Form, redirect, useLoaderData, Link } from 'react-router-dom';
import { createArtwork, getArtworks, randomWord } from '../services/artwork';
import ArtworkPreview from '../components/ArtworkPreview';
import { getAuthData } from '../services/auth';


const action = async ({ request }) => {

  const formData = await request.formData();
  const data = JSON.parse(formData.get('data'));
  const word = await randomWord();
  const tagsString = data.tags.join(', ');

  const payload = {
    angle: data.angle,
    strokeWidth: data.strokeWidth,
    lineCount: data.lineCount,
    startColor: data.startColor,
    endColor: data.endColor,
    starsAttributes: JSON.stringify(data.starsAttributes),
    name: word,
    tags: tagsString,
    svgBackgroundColor: data.svgBackgroundColor,
    name: word,
  };

  const showSuccessMessage = () => {
    const successMessage = document.querySelector('.success-message');
    const patternControlls = document.querySelector('.pattern-controlls');
    successMessage.style.display = 'block';
    patternControlls.style.display = 'none';
  };

  showSuccessMessage();
  await createArtwork(payload);
  return redirect('/auth/profile');
}

const loader = async () => {
  const artworks = await getArtworks(); 
  const user = await getAuthData();
  return { artworks, user };
};

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
const color1 = getRandomColor();
const color2 = getRandomColor();


const CreateArtwork = () => {

  const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
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
  const textColor = svg.theme === 'dark' ? '#F7F7F7' : '#1C1D1E';

  const handleTagInputKeyDown = (event) => {
    if (event.key === 'Enter' && tagInput) {
      event.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const { artworks, user } = useLoaderData();
  const isLogged = user && user.jwt;
  const artworkDisplayCount = 8;

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
        <div className='hidden-block'>
          <div className='success-message'>
            <p>Your artwork has been saved successfully!</p>
          </div>
        </div>

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
          <div className='tags-container'>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Add tags (press Enter to add)"
            />
            <div className="tags-list">
              {tags.map((tag, index) => (
                <span key={index} className="tag tag-add">
                  {tag} <button onClick={() => removeTag(tag)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className='buttons'>
            <button onClick={switchTheme} className='switchThemeButton'>Switch Theme</button>
            <Form method="POST">
              <input type="hidden" name="data" 
              value={JSON.stringify({
                ...svg,
                starsAttributes,
                tags 
              })} readOnly={true} />
    
              <button className='saveArtworkButton' type='submit' disabled={!isLogged}>Save Artwork</button>
              {!isLogged && (
                <div className='unable-save-message'>
                  <p>You need to be logged in to save your artwork.</p>
                  <Link to='/auth/login' className='log-in-helper'>Log in</Link>
                </div>
               )}
            </Form>
          </div>
        </div>
      </div>
    </div>
    
    <div className='saved-artworks'>
      <h2>Explore other Artworks</h2>
      <div className='artworks-container'>
        {artworks.slice(0, artworkDisplayCount).map(artwork => (
          <ArtworkPreview key={artwork.id} artwork={artwork} />
        ))}
      </div>
      <Link to='/artwork-collection' className='signupButton'>Explore more</Link>
    </div>
    </>
  );
}


CreateArtwork.action = action;
CreateArtwork.loader = loader;

export default CreateArtwork;

