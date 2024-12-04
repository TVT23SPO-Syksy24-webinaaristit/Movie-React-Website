//server/routers/groupsRouter.js
import { Router } from "express"
import { getAllGroups, getGroupDetails, postGroupCreate, postGroupJoin, deleteGroup, leaveGroup } from "../controllers/GroupsController.js";

const router = Router();

// Route to fetch all groupsrouter.get("/", GroupController.getAllGroups);

router.get("/", getAllGroups);

router.get("/:id", getGroupDetails);

router.post("/create", postGroupCreate);

router.post("/join", postGroupJoin);

router.delete("/:id/", deleteGroup);

router.delete("/:id/leave", leaveGroup);



export default router;
