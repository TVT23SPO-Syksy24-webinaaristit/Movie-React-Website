import React, {useState} from "react";
import { Link } from 'react-router-dom'
import "./GroupDetailsHighlightCard.css"

const GroupDetailsHighlightCard = (props) =>{
    const [highlightType,setHighlightType] = useState([]);
    const type = 0;
    
    if(props.link_url.includes("jnertikbnrij433.com")===1){
        setHighlightType("s")
    }
    return(
        <div className="highlightCard">
            <div className="poster">
                <img src="/imageplaceholder.jpg" alt="movie poster" />
            </div>
            <div className="title">
                <Link className="link" to={props.link_url}>
                    <p>{props.title}</p>
                </Link>
            

                <p> Posted by: {props.account}</p>
            </div>
        

        </div>
    )
}

export default GroupDetailsHighlightCard;