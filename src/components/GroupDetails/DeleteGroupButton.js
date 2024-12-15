import React from "react";
import { useGroups } from "../../contexts/GroupProvider";
import "./DeleteGroupButton.css"
const DeleteGroupButton = (props) =>{
    const { deleteGroup } = useGroups();
    const handleDeleteGroup = async (groupId) => {
        try {
          await deleteGroup(groupId); // Call the API to delete a group
          alert(`You successfully deleted the group: ${groupId}`);
        } catch (err) {
          console.error("Error deleting group:", err);
          alert("Failed to delete the group. Please try again.");
        }
      };
    
    return(
        <button className="delete-group-button" onClick={() => {handleDeleteGroup(props.groupid)
        }
        }>Delete Group</button>
    )
}

export default DeleteGroupButton;