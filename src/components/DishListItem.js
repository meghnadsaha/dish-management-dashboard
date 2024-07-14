import React from 'react';


const DishListItem = ({ dish, togglePublishStatus }) => {
  const handleTogglePublish = () => {
      togglePublishStatus(dish.dishId);
  };

  return (
      <div className="card">
          <img className="card-image" src={dish.imageUrl} alt={dish.dishName} />
          <div className="card-details">
              <h2 className="card-title">{dish.dishName}</h2>
              <p className="card-status">{dish.isPublished ? 'Published' : 'Unpublished'}</p>
              <button className={`card-button ${dish.isPublished ? 'unpublish' : 'publish'}`} onClick={handleTogglePublish}>
                  {dish.isPublished ? 'Unpublish' : 'Publish'}
              </button>
          </div>
      </div>
  );
};

export default DishListItem;
