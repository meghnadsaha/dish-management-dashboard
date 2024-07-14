import React, { useEffect, useState } from 'react';
import DishItem from './DishItem';
import { fetchDishes, togglePublishStatus } from '../services/dishService';
import io from 'socket.io-client';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const socket = io('http://localhost:8081'); // Replace with your backend WebSocket URL

  useEffect(() => {
    loadDishes();

    // Listen for real-time updates
    socket.on('dishUpdate', (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadDishes = async () => {
    try {
      const fetchedDishes = await fetchDishes();
      setDishes(fetchedDishes);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleTogglePublish = async (dishId) => {
    try {
      const updatedDish = await togglePublishStatus(dishId);
      // Real-time update via socket
      socket.emit('publishStatusChanged', updatedDish);
      // Update the state to reflect the change
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div>
      <h2>Dishes</h2>
      {dishes.map((dish) => (
        <DishItem
          key={dish.dishId}
          dish={dish}
          onTogglePublish={handleTogglePublish}
        />
      ))}
    </div>
  );
};

export default DishList;
