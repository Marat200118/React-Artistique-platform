import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';
import ColorPicker from './ColorPicker';

const EditController = ({ strokeWidth, startColor, endColor, onSliderChange, onColorChange }) => {
  return (
    <header className="controlls">
      <Slider
        max={1}
        min={0.05}
        step={0.01}
        label="Stroke Width"
        value={strokeWidth}
        onChange={(newValue) => onSliderChange("strokeWidth", newValue)}
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
}

export default EditController;

EditController.propTypes = {
  strokeWidth: PropTypes.number.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
};