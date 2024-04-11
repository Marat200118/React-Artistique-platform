import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';
import ColorPicker from './ColorPicker';

const Controller = ({ angle, strokeWidth, lineCount, startColor, endColor, onSliderChange, onColorChange }) => {
  return (
    <header className="App-header">
      <h1>Falling Stars Pattern Generator</h1>
      <Slider
        max={360}
        min={0}
        step={1}
        label="Angle"
        value={angle}
        onChange={(newValue) => onSliderChange("angle", newValue)}
      />
      <Slider
        max={1}
        min={0.05}
        step={0.01}
        label="Stroke Width"
        value={strokeWidth}
        onChange={(newValue) => onSliderChange("strokeWidth", newValue)}
      />
      <Slider
        max={150}
        min={1}
        step={1}
        label="Line Count"
        value={lineCount}
        onChange={(newValue) => onSliderChange("lineCount", newValue)}
      />
      <ColorPicker
        label="Start Color"
        color={startColor}
        onColorChange={(newColor) => onColorChange("startColor", newColor)}
      />
      <ColorPicker
        label="End Color"
        color={endColor}
        onColorChange={(newColor) => onColorChange("endColor", newColor)}
      />
    </header>
  );
};


Controller.propTypes = {
  angle: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  lineCount: PropTypes.number.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
};

export default Controller;
