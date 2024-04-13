import React, { useState, useEffect } from 'react';
import './App.css';
import LinePatternGenerator from './components/LinePatternGenerator';
import Controller from './components/Controller'; 
import fetchApi from "./fetchApi.js";

const App = () => {

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];   //* taken from https://stackoverflow.com/questions/1484506/random-color-generator
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

  useEffect(() => {
    const currentCount = starsAttributes.length;
    const { lineCount } = svg;
    if (lineCount > currentCount) {
      const additionalStars = generateStarsAttributes(lineCount - currentCount);
      setStarsAttributes(currentStars => [...currentStars, ...additionalStars]);
    } else if (lineCount < currentCount) {
      setStarsAttributes(currentStars => currentStars.slice(0, lineCount));
    }
  }, [svg.lineCount, starsAttributes.length]);

  useEffect(() => {
    const updatedStars = starsAttributes.map(attr => {
      const lineLength = getRandomInRange(30, 100);
      const angleRad = svg.angle * (Math.PI / 180);
      const x2 = attr.x1 + lineLength * Math.cos(angleRad);
      const y2 = attr.y1 + lineLength * Math.sin(angleRad);
      return { ...attr, x2, y2 };
    });
    setStarsAttributes(updatedStars);
  }, [svg.angle]);

  const handleSliderChange = (property, value) => {
    setSvg({ ...svg, [property]: Number(value) });
    console.log(property, value);
  };

  const onColorChange = (colorType, color) => {
    setSvg({ ...svg, [colorType]: color });
    console.log(colorType, color);
  };
 
  const { strokeWidth, lineCount, angle, startColor, endColor, theme } = svg;
  const svgBackgroundColor = svg.theme === 'dark' ? '#1C1D1E' : '#F2F2F2';
  const textColor = svg.theme === 'dark' ? '#F7F7F7' : '#1C1D1E';
  const buttonTextColor = svg.theme === 'dark' ? '#1C1D1E' : '#F7F7F7';



  // Backend 
  const saveArtworkToBackend = async () => {
  
  const payload = {
    data: {
      angle: svg.angle,
      strokeWidth: svg.strokeWidth,
      lineCount: svg.lineCount,
      startColor: svg.startColor,
      endColor: svg.endColor,
      name: `Artwork_${Date.now()}`
    }
  };

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
  
  } catch (error) {
    console.error('Could not save artwork:', error);
    
  }
};

  return (
     <div className="App" style={{ color: textColor }}>
      <div className='header'>
        <h1>Falling Stars Pattern Generator</h1>
        {/* <p>Generate your own unique line pattern by adjusting the sliders below!</p> */}
      </div>
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
      <div className='saved-artworks'>
        <h2>Saved Artworks</h2>
      </div>
    </div>
  );
}



export default App;


