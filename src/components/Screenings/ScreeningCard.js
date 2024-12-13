import React from "react";
import "./ScreeningCard.css"
import { Link } from 'react-router-dom'
import AddToGroupHighlightDropdown from "../AddToGroupHighlightDropdown";

const ScreeningCard = (props) => {
    const description = "Date: "+props.day+"."+props.month+" \n"
    +"Time: "+props.hours+":"+props.minutes+" \n"
    +props.auditorium
    return (
        <div className="screeningCard">
            <Link className="link" to={props.finnkinoUrl}>
            <div className="titleLink">
            <h3>{props.title}</h3>
            <p>{props.day}.{props.month}</p>
            </div>
            </Link>
            <p><i>{props.auditorium}</i></p>
            <p>Esitys alkaa: {props.hours}:{props.minutes}</p>
            <div className="screeningPoster">
                <img src={props.image} alt="Screening" className="poster"></img>
            </div> 
            <AddToGroupHighlightDropdown 
            idevent={props.idevent}
            description={description}
            image={props.image}
            title={props.title}
            sourceUrl={props.finnkinoUrl}

            />
            
        </div>
    )
}
export default ScreeningCard;