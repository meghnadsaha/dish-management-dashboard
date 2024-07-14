import React from 'react';

const DishItem = ({ dish, onTogglePublish }) => {
  const { dishId, dishName, imageUrl, isPublished } = dish;

  const handleToggle = () => {
    onTogglePublish(dishId);
  };

  return (
    <div key={dishId}>
      <img src={imageUrl} alt={dishName} style={{ width: '100px' }} />
      <h3>{dishName}</h3>
      <p>Published: {isPublished ? 'Yes' : 'No'}</p>
      <button onClick={handleToggle}>
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  );
};

export default DishItem;
