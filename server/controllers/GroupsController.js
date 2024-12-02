import { GroupModel } from "../models/GroupModel.js";

export const GroupController = {
  // Get all groups
  async getAllGroups(req, res, next) {
    try {
      const groups = await GroupModel.fetchAllGroups();
      return res.status(200).json(groups); // Send groups to the frontend
    } catch (error) {
      console.error("Error fetching groups:", error);
      next(error); // Pass error to error-handling middleware
    }
  },

  // Get details for a specific group
  async getGroupDetails(req, res, next) {
    const { id } = req.params;
    try {
      const group = await GroupModel.fetchGroupById(id);
      return res.status(200).json(group); // Send the group details
    } catch (error) {
      console.error("Error fetching group details:", error);
      next(error); // Pass error to error-handling middleware
    }
  },

  // Create a new group
  async addGroup(req, res, next) {
    const groupData = req.body;
    try {
      const newGroup = await GroupModel.createGroup(groupData);
      return res.status(201).json(newGroup); // Send the new group details
    } catch (error) {
      console.error("Error creating group:", error);
      next(error); // Pass error to error-handling middleware
    }
  }
};

export default GroupController;
