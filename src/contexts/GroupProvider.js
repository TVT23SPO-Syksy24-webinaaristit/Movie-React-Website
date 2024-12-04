//src/contexts/GroupProvider.js
import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // API URL

const GroupContext = createContext();

// Custom hook to use the group context
export function useGroups() {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
}

export const GroupProvider = ({ children }) => {
  const { user } = useContext(UserContext); // Access user from UserContext

  // Fetch all groups
  
  const fetchAllGroups = async (userId) => {
    // Pass both the Bearer token and userId correctly in the headers
    const headers = {
      Authorization: user.token, // For Bearer token authentication
      'user-id': userId,  // Custom header for userId
    };
  
    sessionStorage.setItem("user.id", userId);
  
    try {
      // Send the headers with the GET request
      const response = await axios.get(`${API_URL}/groups`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  };
  
  const createGroup = async (userId, groupName, groupDescription) => {
    const headers = {
        Authorization: user.token,
    };
    try {
        console.log("User ID:", user.id);  // Ensure this logs the correct user ID
      console.log("headers:", headers);  // Ensure the headers are correct
      const response = await axios.post(`${API_URL}/groups/create`, {
        owner: userId,
        name: groupName,
        description: groupDescription,
      }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  // Delete a group
  const deleteGroup = async (groupId) => {
    const headers = {
        Authorization: user.token,
    };
    try {
      const response = await axios.delete(`${API_URL}/groups/${groupId}`,
        { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  };


  // Join a group
  const joinGroup = async (groupId) => {
    const headers = {
        Authorization: user.token,

     };
    try {
      const response = await axios.post(`${API_URL}/groups/join`, {
        groups_idgroup: groupId,
        accounts_idaccount: user.id,
      }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  };

  // Leave a group
  const leaveGroup = async (groupId) => {
    const headers = { headers: {Authorization: user.token }};
    try {
      const response = await axios.delete(`${API_URL}/groups/${groupId}/leave`, {
        headers,
        data: { userId: user.id },
      });
      return response.data;
    } catch (error) {
      console.error('Error leaving group:', error);
      throw error;
    }
  };


  return (
    <GroupContext.Provider value={{ fetchAllGroups, joinGroup, leaveGroup, createGroup, deleteGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
