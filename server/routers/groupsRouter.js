//server/routers/groupsRouter.js
import { Router } from "express"
import { auth } from "../helpers/auth.js";
import { getAllGroups, getGroupDetails, getGroupHighlights, getGroupMembers, getGroupJoinRequesters, 
    postGroupCreate, postGroupHighlight, postGroupJoin, postJoinRequest, postJoinRequestReply,
    deleteGroup, leaveGroup, deleteHighlight } from "../controllers/GroupsController.js";

const router = Router();

// Route to fetch all groupsrouter.get("/", GroupController.getAllGroups);

router.get("/", auth, getAllGroups);

router.get("/:id",  getGroupDetails);

router.get("/highlights/:id", getGroupHighlights);

router.get("/:id/members", getGroupMembers);

router.get("/:id/requesters", getGroupJoinRequesters);

router.post("/create", auth, postGroupCreate);

router.post("/highlightcreate", postGroupHighlight);

router.post("/join", auth, postGroupJoin);

router.post("/sendjoinrequest",auth, postJoinRequest);

router.post("/requestreply", postJoinRequestReply);

router.delete("/:id/", auth, deleteGroup);

router.delete("/:id/leave", auth, leaveGroup);

router.delete(":id/highlight", deleteHighlight);





export default router;
