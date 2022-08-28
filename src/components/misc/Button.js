import React from 'react';

const Button = ({ isSelected, value, clickHandler }) => {
  return (
    <div className="filter-btn-element">
      <button
        className="clickElement"
        onClick={() => {
          clickHandler(value);
        }}
      >
        {isSelected ? `[${value}]` : value}
      </button>
    </div>
  );
};

export default Button;
