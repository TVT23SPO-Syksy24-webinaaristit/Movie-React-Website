import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // API URL

// Fetch all groups
const fetchAllGroups = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/groups`, {
      params: { userId }, // Send userId as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};


// Join a group
const joinGroup = async (groupId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/groups/join`, {
       groups_idgroup : groupId,
       accounts_idaccount : userId,
    }, );
    return response.data;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};

// Create a group
const createGroup = async (userId, groupName, groupDescription) => {
  try {
    const response = await axios.post(`${API_URL}/groups/create`, {
      owner: userId, // Send userId as owner
      name: groupName, // Send group name
      description: groupDescription, // Send description
    }, );
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Delete a group
const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${API_URL}/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};

export { fetchAllGroups, joinGroup, createGroup, deleteGroup };
