// services/groupService.js
// src/services/GroupService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Make sure this is set in your .env file

const GroupService = {
  async fetchAllGroups() {
    try {
      const response = await axios.get(`${API_URL}/groups`);
      return response.data; // Axios already parses JSON responses
    } catch (error) {
      console.error("Error fetching all groups:", error);
      throw error;
    }
  },

  async fetchGroupById(id) {
    try {
      const response = await axios.get(`${API_URL}/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching group details:", error);
      throw error;
    }
  },

  async createGroup(groupData) {
    try {
      const response = await axios.post(`${API_URL}/groups`, groupData);
      return response.data;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  },
};

export const { fetchAllGroups, fetchGroupById, createGroup } = GroupService;
