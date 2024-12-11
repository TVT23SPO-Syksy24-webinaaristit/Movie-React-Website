import React from "react";
import { useGroups } from "../../contexts/GroupProvider";
import "./DeleteGroupButton.css"
const DeleteGroupButton = () =>{
    const { deleteGroup } = useGroups();
    return(
        <button className="delete-group-button" onClick={() => {
            deleteGroup();

        }
        }>Delete Group</button>
    )
}

export default DeleteGroupButton;