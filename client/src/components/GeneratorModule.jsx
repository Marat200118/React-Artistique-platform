import React, { useState } from 'react';
import '../styles/style.css';
import LinePatternGenerator from './LinePatternGenerator';
import Controller from './Controller'; 
import fetchApi from "../services/fetchApi";

const App = () => {

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  const [svg, setSvg] = useState ({
    strokeWidth: getRandomInRange(0.05, 1),
    lineCount: Math.round(Math.random() * 150),
    angle: Math.round(Math.random() * 360),
    startColor: getRandomColor(),
    endColor: getRandomColor(),
    theme: 'dark',
  });

  const switchTheme = () => {
    setSvg(prevSvg => ({
      ...prevSvg,
      theme: prevSvg.theme === 'dark' ? 'light' : 'dark'
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
  const [savedArtworks, setSavedArtworks] = useState([]);

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
    setSvg({ ...svg, [colorType]: color });
    console.log(colorType, color);
  };
 
  const { strokeWidth, lineCount, angle, startColor, endColor, theme } = svg;
  const svgBackgroundColor = svg.theme === 'dark' ? '#1C1D1E' : '#F2F2F2';
  const textColor = svg.theme === 'dark' ? '#F7F7F7' : '#1C1D1E';


  // Backend 
  const saveArtworkToBackend = async () => {


    const payload = {
      data: {
        angle: svg.angle,
        strokeWidth: svg.strokeWidth,
        lineCount: svg.lineCount,
        startColor: svg.startColor,
        endColor: svg.endColor,
        starsAttributes: JSON.stringify(starsAttributes),
        name: `Artwork_${Date.now()}`,
        svgBackgroundColor: currentBackgroundColor
      }
    };

    console.log("Sending payload:", payload);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    try {
      const savedArtwork = await fetchApi({
        endpoint: 'artworks', 
        wrappedByKey: 'data',
      }, options);

      console.log('Artwork saved:', savedArtwork);

      setSavedArtworks(prevArtworks => [...prevArtworks, {
        ...payload.data,
        id: savedArtwork.id,
      }]);

    } catch (error) {
      console.error('Could not save artwork:', error);
    }
  };




  return (
     <div className="Generator-module" style={{ color: textColor }}>
      <div className='pattern-controlls-container'>
        <LinePatternGenerator
          strokeWidth={strokeWidth}
          startColor={startColor}
          endColor={endColor}
          svgBackgroundColor={svgBackgroundColor}
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
            <button onClick={switchTheme} className='switchThemeButton' style={{}}>
              Switch Theme
            </button>
            <button onClick={saveArtworkToBackend} className='saveArtworkButton' style={{}}>
              Save Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;


