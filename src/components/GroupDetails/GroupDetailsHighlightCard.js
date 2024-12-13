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

    alert("Shared to group!")
    console.log(highlightId)
    }

    return(
        <div className="highlightCard">
            <div className="poster">
                <img src="/imageplaceholder.jpg" alt="movie poster" />
            </div>
            <div className="title">
                <Link className="link" to={props.link_url}>
                    <p><b>{props.title}</b></p><br />
                </Link>
            
                
                <p> Posted by: {props.account}</p>
            </div>
            <button onClick={()=>{deleteHighlightHandler(props.highlightid)}}>
            ❌
            </button>

        </div>
    )
}

export default GroupDetailsHighlightCard;