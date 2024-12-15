//server/routers/groupsRouter.js
import { Router } from "express"
import { auth } from "../helpers/auth.js";
import { getAllGroups, getGroupDetails, getGroupHighlights, getGroupMembers, getGroupJoinRequesters, 
    postGroupCreate, postGroupHighlight, postGroupJoin, postJoinRequest,
    deleteGroup, leaveGroup, deleteHighlight } from "../controllers/GroupsController.js";

const router = Router();

// Route to fetch all groupsrouter.get("/", GroupController.getAllGroups);

router.get("/", getAllGroups);

router.get("/:id", auth, getGroupDetails);

router.get("/highlights/:id", auth, getGroupHighlights);

router.get("/:id/members", auth, getGroupMembers);

router.get("/:id/requesters", auth, getGroupJoinRequesters);

router.post("/create", auth, postGroupCreate);

router.post("/highlightcreate", auth, postGroupHighlight);

router.post("/join", auth, postGroupJoin);

router.post("/sendjoinrequest",auth, postJoinRequest);

router.delete("/:id/", auth, deleteGroup);

router.delete("/:id/leave", auth, leaveGroup);

router.delete("/:id/highlight", auth, deleteHighlight);





export default router;
