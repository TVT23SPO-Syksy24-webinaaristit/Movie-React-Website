//server/controllers/GroupsController.js
import {selectAllGroups, selectGroupById, insertGroupCreate, deleteGroupDelete, deleteGroupLeave, insertGroupJoin} from '../models/Group.js'; // Import the model from /models

const getAllGroups = async (req, res, next) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const groups = await selectAllGroups(userId);  // Selecting all the available groups from the model
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
  const { owner, name, description } = req.body; // These should match what the frontend sends
  //console.log("Incoming request body:", req.body); // Log the raw request body for debugging

  try {
    const newGroup = await insertGroupCreate({ owner, name, description }); // Pass an object with named properties
    return res.status(201).json(newGroup); // Return the new group details
  } catch (error) {
    console.error("Error in controller (creating group):", error);
    next(error); // Pass error to error-handling middleware
  }
};

const deleteGroup = async (req, res, next) => {
  const { id } = req.params; // ID of the group to delete
  const { userId } = req.query; // Assuming userId is set in middleware (e.g., authentication middleware)
  try {
    // Fetch the group details to confirm ownership
    const group = await selectGroupById(id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the current user is the owner of the group
    if (group.owner !== userId) {
      return res.status(403).json({ error: "You are not authorized to delete this group" });
    }

    // Proceed to delete the group
    const deletedGroup = await deleteGroupDelete(id); // Delete the group using the model
    return res.status(200).json(deletedGroup); // Return the deleted group details
  } catch (error) {
    console.error("Error in controller (deleting group):", error);
    next(error); // Pass error to error-handling middleware
  }
};

const leaveGroup = async (req, res, next) => {
  const { id } = req.params; // ID of the group to leave
  const { userId } = req.query; // Assuming userId is set in middleware (e.g., authentication middleware)

  try {
    // Proceed to remove the user from the group
    const result = await deleteGroupLeave(id, userId); // Use the model to remove the user
    return res.status(200).json({ message: "Successfully left the group", result });
  } catch (error) {
    console.error("Error in controller (leaving group):", error);
    next(error); // Pass error to error-handling middleware
  }
};



const postGroupJoin = async (req, res, next) => {
  const { groups_idgroup, accounts_idaccount } = req.body;
  try {
    const updatedGroup = await insertGroupJoin(groups_idgroup, accounts_idaccount, 1);  // Update group via model
    return res.status(200).json(updatedGroup); // Return the updated group details
  } catch (error) {
    console.error("Error in controller (joining group):", error);
    next(error);  // Pass error to error-handling middleware
  }
};

export { getAllGroups, getGroupDetails, postGroupCreate, postGroupJoin , deleteGroup, leaveGroup }; // Export the controller functions
