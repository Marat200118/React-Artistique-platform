import React from 'react';
import PropTypes from 'prop-types';

const Slider = ({ min, max, value, step, onChange, label }) => {
  const handleSliderChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="slider-container">
      <label>
        {label}:
        <input
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
        />
      </label>
      {/* <div>Value: {value}</div> */}
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

Slider.defaultProps = {
  label: 'Slider'
};

export default Slider;
