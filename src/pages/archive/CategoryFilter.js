import React from 'react';
/** components */
import Button from '../../components/misc/Button';

const CategoryFilter = ({ categories, handleChange, selected }) => {
  return (
    <>
      <div className="filter-btn-holder">
        {categories.map((category) => (
          <Button isSelected={category === selected} value={category} clickHandler={handleChange} />
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
