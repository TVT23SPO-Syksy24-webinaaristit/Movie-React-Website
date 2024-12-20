import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useGroups } from "../../contexts/GroupProvider";
import { useUser } from "../../contexts/useUser";
import user_icon from '../Assets/person.png';
import "./GroupDetailsMemberCard.css"
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
        <div className="memberCard">
            <img src={user_icon}></img>
            <p>Member:</p>
            <Link to={`/profile/${props.idaccount}`}>
            <p> {props.username}</p>
            </Link>
            {props.showKickButton === 1 && props.idaccount !== parseInt(user.id) ?(
            <div className="kickbutton">
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