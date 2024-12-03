//server/controllers/GroupsController.js
import {selectAllGroups, selectGroupById, insertGroupCreate, insertGroupJoin} from '../models/Group.js'; // Import the model from /models

const getAllGroups = async (req, res, next) => {
  try {
    const groups = await selectAllGroups();  // Selecting all the available groups from the model
    return res.status(200).json(groups); // Return the groups to the client
  } catch (error) {
    console.error("Error in controller (fetching all groups):", error);
    next(error);  // Pass error to error-handling middleware
  }
};

const getGroupDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const group = await selectGroupById(id);  // Fetch group by ID from model
    return res.status(200).json(group); // Return the group details
  } catch (error) {
    console.error("Error in controller (fetching group details):", error);
    next(error);  // Pass error to error-handling middleware
  }
};

const postGroupCreate = async (req, res, next) => {
  const groupData = req.body;
  try {
    const newGroup = await insertGroupCreate(groupData);  // Create group via model
    return res.status(201).json(newGroup); // Return the new group details
  } catch (error) {
    console.error("Error in controller (creating group):", error);
    next(error);  // Pass error to error-handling middleware
  }
};

const postGroupJoin = async (req, res, next) => {
  const { groupId, userId } = req.body;
  try {
    const updatedGroup = await insertGroupJoin(groupId, userId);  // Update group via model
    return res.status(200).json(updatedGroup); // Return the updated group details
  } catch (error) {
    console.error("Error in controller (joining group):", error);
    next(error);  // Pass error to error-handling middleware
  }
};

export { getAllGroups, getGroupDetails, postGroupCreate, postGroupJoin};
