import React, {useState} from "react";
import { Link } from 'react-router-dom'


const GroupDetailsHighlightCard = (props) =>{
    const [highlightType,setHighlightType] = useState([]);
    const type = 0;
    
    if(props.link_url.includes("jnertikbnrij433.com")===1){
        setHighlightType("s")
    }
    return(
        <div>
            <div>
        <Link className="link" to={props.link_url}>
        <p>{props.title}</p>
        
        </Link>
        </div>
        <p>Posted by: {props.account}</p>
        <div>
            <img src={props.image} alt="movie poster" />
        </div>

        </div>
    )
}

export default GroupDetailsHighlightCard;