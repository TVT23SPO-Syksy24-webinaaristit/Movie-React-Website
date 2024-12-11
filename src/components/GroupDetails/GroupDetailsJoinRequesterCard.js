import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useGroups } from "../../contexts/GroupProvider";



const GroupDetailsJoinRequesterCard = (props) =>{
  const { joinGroup } = useGroups();
    const handleJoinGroup = async(groupid,accountid) =>{
      try{
        await joinGroup(groupid,accountid);
        alert("User accepted to group");
      }catch(error){
        console.error("Error accepting account to group:", error);
      alert("Failed to accept user to group. Please try again.");
      }
    }
    
    return(
        <div>

            <p>requester: {props.username}</p>

            {
            }
            {props.showAnswerButtons === 1 ? (
                <button
                className="join-button"
                onClick={()=>
                  handleJoinGroup(props.groupid,props.accountid)} // Pass the group ID
              >idaccount:{props.accountid}
                ✅ Accept
              </button>
            ):(
                <br />
            )}
            {/* {group.isMember ? (
                  <button className="join-button" disabled>
                    ✅ Joined
                  </button>
                ) : (
                  <button
                    className="join-button"
                    onClick={()=>
                      handleJoinGroup(group.id)} // Pass the group ID
                  >
                    ➕ Join
                  </button>
                )}
                {group.isMember && (
                  group.isOwner ? (
                    <button className="join-button" onClick={() => handleDeleteGroup(group.id)}>
                      😭 Delete Group
                    </button>
                  ) : (
                    <button
                      className="join-button"
                      onClick={() => handleLeaveGroup(group.id)} // Pass the group ID
                    >
                      😢 Leave
                    </button>
                  )
                )} */}




        </div>
    )
}
export default GroupDetailsJoinRequesterCard;