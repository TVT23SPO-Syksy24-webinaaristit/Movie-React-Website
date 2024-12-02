import express from "express";
import { GroupController } from "../controllers/GroupsController.js";

const router = express.Router();

// Route to fetch all groups
router.get("/", GroupController.getAllGroups);

// Route to fetch a group by ID
router.get("/:id", GroupController.getGroupDetails);

// Route to create a new group
router.post("/", GroupController.addGroup);

export default router;
