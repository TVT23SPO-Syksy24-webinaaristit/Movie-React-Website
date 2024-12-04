//server/routers/groupsRouter.js
import { Router } from "express"
import { getAllGroups, getGroupDetails, postGroupCreate, postGroupJoin } from "../controllers/GroupsController.js";

const router = Router();

// Route to fetch all groupsrouter.get("/", GroupController.getAllGroups);

router.get("/", getAllGroups);

router.get("/:id", getGroupDetails);

router.post("/create", postGroupCreate);

router.post("/join", postGroupJoin);

export default router;
