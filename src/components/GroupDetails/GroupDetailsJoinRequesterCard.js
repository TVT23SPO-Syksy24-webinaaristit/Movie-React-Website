import React, {useState} from "react";
import { Link } from 'react-router-dom';


const GroupDetailsJoinRequesterCard = (props) =>{
    
    const handleJoinGroup = (groupid) =>{

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
                  handleJoinGroup(props.groupid)} // Pass the group ID
              >
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