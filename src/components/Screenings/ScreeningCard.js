import React from "react";
import "./ScreeningCard.css"
import { Link } from 'react-router-dom'
import AddToGroupHighlightDropdown from "../AddToGroupHighlightDropdown";

const ScreeningCard = (props) => {
    return (
        <div className="screeningCard">
            <Link className="link" to={props.finnkinoUrl}>
            <div className="titleLink">
            <h3>{props.title}</h3>
            </div>
            </Link>
            <p><i>{props.auditorium}</i></p>
            <p>Esitys alkaa: {props.hours}:{props.minutes}</p>
            <div className="screeningPoster">
                <img src={props.image} alt="Screening" className="poster"></img>
            </div> 
            <AddToGroupHighlightDropdown />
            
        </div>
    )
}
export default ScreeningCard;