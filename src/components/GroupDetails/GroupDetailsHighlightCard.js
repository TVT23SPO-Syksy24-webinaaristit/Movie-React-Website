import React, {useState} from "react";
import { Link } from 'react-router-dom'
import "./GroupDetailsHighlightCard.css"

const GroupDetailsHighlightCard = (props) =>{ 
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
        

        </div>
    )
}

export default GroupDetailsHighlightCard;