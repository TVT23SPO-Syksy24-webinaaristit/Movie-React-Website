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
    const response = await axios.post(`${API_URL}/groups/join`, { groupId, userId});  // Join group
    return response.data;
  } catch (error) {
    console.error("Error joining group:", error);
    throw error;
  }
};

const createGroup = async (groupData) => {
  try {
    const response = await axios.post(`${API_URL}/groups/create`, groupData);  // Create group
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${API_URL}/groups/${groupId}`);  // Delete group
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};

export { fetchAllGroups, joinGroup, createGroup, deleteGroup };  // Export the services
