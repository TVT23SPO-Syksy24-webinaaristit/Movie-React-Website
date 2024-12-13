import React from "react";
import { useGroups } from "../../contexts/GroupProvider";

const LeaveGroupButton = (props) =>{
    const { leaveGroup } = useGroups();
    const handleLeaveGroup = async (groupId) => {
        try {
          await leaveGroup(groupId); // Call the API to delete a group
          alert(`You successfully left from group: ${groupId}`);
        } catch (err) {
          console.error("Error leaving from group:", err);
          alert("Failed to leave from group. Please try again.");
        }
      };
    
    return(
        <button className="leave-group-button" onClick={() => {handleLeaveGroup(props.groupid)
        }
        }>Leave Group</button>
    )
}

export default LeaveGroupButton;