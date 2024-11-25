import React from "react";


const ScreeningCard = (props) => {
    return (
        <div className="ScreeningCard">
            <h3><a href={props.finnkinoUrl}>{props.title}</a></h3>
            <p>Esitys alkaa: {props.hours}:{props.minutes}</p>
            <div className="ScreeningPoster">
                <img src={props.image} alt="Screening"></img>
            </div>  
        </div>
    )
}
export default ScreeningCard;