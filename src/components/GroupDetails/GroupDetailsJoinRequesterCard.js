import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useGroups } from "../../contexts/GroupProvider";



const GroupDetailsJoinRequesterCard = (props) =>{
  const { joinGroup, leaveGroup } = useGroups();
    const handleAcceptToGroup = async(groupid,accountid) =>{
      try{
        await joinGroup(groupid,accountid);
        alert("User accepted to group");
      }catch(error){
        console.error("Error accepting account to group:", error);
      alert("Failed to accept user to group. Please try again.");
      }
    };

    const handleDenyToGroup = async (groupid,accountid) => {
      try {
        await leaveGroup(groupid, accountid); // Call the API to leave a group
        alert(`User join request denied`);
      } catch (err) {
        console.error("Error denying join request:", err);
        alert("Failed to deny join request. Please try again.");
      }
    };
    
    return(
        <div>

            <p>requester: {props.username}</p>
            <p>Time of request: {props.date}</p>
            
            {
            }
            {props.showAnswerButtons === 1 ? (
              <div>
                <button
                className="join-button"
                onClick={()=>
                  handleAcceptToGroup(props.groupid,props.accountid)} // Pass the group ID
              >idaccount:{props.accountid}
                ✅ Accept
              </button>
              <button
              className="join-button"
              onClick={()=>
                handleDenyToGroup(props.groupid,props.accountid)} // Pass the group ID
            >idaccount:{props.accountid}
              ❌ Deny
            </button>
            </div>
            ):(
                <br />
            )}
        </div>
    )
}
export default GroupDetailsJoinRequesterCard;