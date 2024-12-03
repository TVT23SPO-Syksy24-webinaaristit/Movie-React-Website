//src/services/GroupsService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';  // API URL

const fetchAllGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups`);  // Get all groups
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

const joinGroup = async (groupId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/groups/join`, { groupId, userId });  // Join group
    return response.data;
  } catch (error) {
    console.error("Error joining group:", error);
    throw error;
  }
};

export { fetchAllGroups, joinGroup };  // Export the services
