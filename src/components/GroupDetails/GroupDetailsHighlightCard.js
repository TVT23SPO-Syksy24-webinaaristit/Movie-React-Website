import React from "react";
import { Link } from 'react-router-dom'
import "./GroupDetailsHighlightCard.css"
import { useGroups } from "../../contexts/GroupProvider";

const GroupDetailsHighlightCard = (props) =>{ 
    const {deleteHighlight} = useGroups();
    
    //WORK IN PROGRESS, does not work.
    const deleteHighlightHandler = async(highlightId) =>{
        try{
            await deleteHighlight(highlightId);
        }catch(error){
            console.log(error);
        }
    alert("Highlight removed")
    }

    return(
        <div className="highlightCard">
            <Link className="link" to={props.link_url}>
            <div className="poster">
                <img src={props.image} alt="movie poster" />
            </div>
            </Link>
            <div className="title">
                <Link className="link" to={props.link_url}>
                    <p><b>{props.title}</b></p><br />
                </Link>
                <p>{props.description}</p>
                <p>Posted by: </p>
                <Link to={`/profile/${props.accountid}`}>
                <p>{props.account}</p>
                </Link>
            </div>
            <button onClick={()=>{deleteHighlightHandler(props.highlightid)}}>
            ❌
            </button>
        </div>
    )
}

export default GroupDetailsHighlightCard;