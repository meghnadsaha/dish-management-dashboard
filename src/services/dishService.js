import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/dishes';

export const fetchDishes = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const togglePublishStatus = async (dishId) => {
  const response = await axios.put(`${API_BASE_URL}/${dishId}/publish`);
  return response.data;
};