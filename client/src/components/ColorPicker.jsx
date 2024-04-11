// ColorPicker.jsx
import React from 'react';

const ColorPicker = ({ label, color, onColorChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <input
        type="color"
        value={color}
        onChange={e => onColorChange(e.target.value)}
        style={{ margin: '10px' }}
      />
    </div>
  );
};

export default ColorPicker;
