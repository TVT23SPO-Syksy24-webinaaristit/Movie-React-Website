import React, {useState} from "react";
import { Link } from 'react-router-dom';

const GroupDetailsJoinRequesterCard = (props) =>{
    
    return(
        <div>

            <p>requester: {props.username}</p>
        </div>
    )
}
export default GroupDetailsJoinRequesterCard;