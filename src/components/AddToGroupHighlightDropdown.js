import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useGroups } from "../contexts/GroupProvider";
import { useUser } from "../contexts/useUser";
const AddToGroupHighlightDropdown =(props)=> {
    const { createHighlight, fetchAllGroups } = useGroups();
    const { user } = useUser();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetchAllGroups(user.id); // Pass user ID to fetchAllGroups
                if (response && Array.isArray(response)) {
                    setGroups(response); // Set the groups array
                    setGroups(grouplist => grouplist.filter(item => item.isMember > 0)) //Update groups to only show groups the user is a member of
                } else {
                    setGroups([])
                }


            } catch (error) {
                console.log(error);
            }
        };
        fetchGroups();
    }, [user.id])
    //WORK IN PROGRESS, does not work.
    const handleChange = async (groupid) => {
        if (groupid !== '0') {
            try {
                await createHighlight(groupid, props.image, props.title, props.idevent, props.description, props.sourceUrl)
            } catch (error) {

            }

            alert("Shared to group!")
            console.log(groupid)
        }
    }
    return (
        <div>
            <select onChange={(group) => handleChange(group.target.value, "Date")}>
                <option value={0}>Share screening to group</option>
                {
                    groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))
                }
            </select>
        </div>
    )
}


export default AddToGroupHighlightDropdown;