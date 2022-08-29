import React from 'react';
/** components */
import Button from '../../components/misc/Button';

const CategoryFilter = ({ categories, handleChange, selected }) => {
  return (
    <>
      <div className="filter-btn-holder">
        {categories && categories.length > 0
          ? categories.map((category) => (
              <Button
                isSelected={category === selected}
                value={category}
                clickHandler={handleChange}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default CategoryFilter;
