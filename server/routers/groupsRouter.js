//server/routers/groupsRouter.js
import { Router } from "express"
import { auth } from "../helpers/auth.js";
import { getAllGroups, getGroupDetails, postGroupCreate, postGroupJoin, deleteGroup, leaveGroup } from "../controllers/GroupsController.js";

const router = Router();

// Route to fetch all groupsrouter.get("/", GroupController.getAllGroups);

router.get("/", auth, getAllGroups);

router.get("/:id", auth, getGroupDetails);

router.post("/create", auth, postGroupCreate);

router.post("/join", auth, postGroupJoin);

router.delete("/:id/", auth, deleteGroup);

router.delete("/:id/leave", auth, leaveGroup);



export default router;
