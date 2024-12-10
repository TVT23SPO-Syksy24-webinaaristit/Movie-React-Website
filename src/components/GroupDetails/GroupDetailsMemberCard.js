import React, {useState} from "react";
import { Link } from 'react-router-dom';

const GroupDetailsMemberCard = (props) =>{
    
    return(
        <div>

            <p>Member: {props.username}</p>
        </div>
    )
}
export default GroupDetailsMemberCard;