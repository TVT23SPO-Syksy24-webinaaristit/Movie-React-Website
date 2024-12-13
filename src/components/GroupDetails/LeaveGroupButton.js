import React from "react";
import { useGroups } from "../../contexts/GroupProvider";

const LeaveGroupButton = (props) =>{
    const { leaveGroup } = useGroups();
    const handleLeaveGroup = async (groupId) => {
        try {
          await leaveGroup(groupId); // Call the API to delete a group
          alert(`You successfully deleted the group: ${groupId}`);
        } catch (err) {
          console.error("Error deleting group:", err);
          alert("Failed to delete the group. Please try again.");
        }
      };
    
    return(
        <button className="leave-group-button" onClick={() => {handleLeaveGroup(props.groupid)
        }
        }>Leave Group</button>
    )
}

export default LeaveGroupButton;