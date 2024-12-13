import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useGroups } from "../../contexts/GroupProvider";
import { useUser } from "../../contexts/useUser";
const GroupDetailsMemberCard = (props) =>{
   const {leaveGroup} = useGroups();
   const {user} = useUser();
    const handleKickFromGroup=async(groupid,accountid)=>{
        try{
            console.log(groupid,accountid)
        await leaveGroup(groupid, accountid); // Call the API to leave a group
        alert(`User kicked from group`);
      } catch (err) {
        console.error("Error kicking group member:", err);
        alert("Failed to kick group member. Please try again.");
        }
    };
    console.log(props.idgroup,props.idaccount)
    return(
        <div>

            <p>Member: {props.username}</p>
            {props.showKickButton === 1 && props.idaccount !== parseInt(user.id) ?(
            <div>
                <button onClick={()=>handleKickFromGroup(props.idgroup,props.idaccount)}>
                    ❌ Kick
                </button>

            </div>
            ):(
                <br />
            )}
        </div>
    )
}
export default GroupDetailsMemberCard;