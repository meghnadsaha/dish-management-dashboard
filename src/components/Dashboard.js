import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DishListItem from './DishListItem';
import './Dashboard.css'; // Import custom CSS for styling

const Dashboard = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        fetchDishes();
        const interval = setInterval(fetchDishes, 1000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/dishes');
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    const togglePublishStatus = async (dishId) => {
        try {
            await axios.put(`http://localhost:8081/api/dishes/${dishId}`);
            fetchDishes(); // Refresh dishes after toggling
        } catch (error) {
            console.error('Error toggling publish status:', error);
        }
    };

    return (

        <div className="dashboard-container">
            <h1 className="dashboard-title">Dishes Dashboard</h1>
            <div className="card-container">
                {dishes.map(dish => (
                    <DishListItem key={dish.dishId} dish={dish} togglePublishStatus={togglePublishStatus} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
