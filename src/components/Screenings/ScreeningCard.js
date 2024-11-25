import React from "react";


const ScreeningCard = (props) => {
    return (
        <div className="ScreeningCard">
            <p><b>{props.title}</b></p>
            <p>Esitys alkaa: {props.hours}:{props.minutes}</p>
            <img src={props.image} alt="Screening"></img>
            <br />
        </div>
    )

}
export default ScreeningCard;