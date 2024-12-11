import React from "react";
import "./ScreeningCard.css"
import { Link } from 'react-router-dom'


const ScreeningCard = (props) => {

    const handleChange = (groupid)=>{
        if(groupid !== '0'){
        alert("Shared to group!")
        console.log(groupid)
        }
    }
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
            
            <select onChange={(group) => handleChange(group.target.value,"Date")}>
                <option value={0}>Share screening to group</option>
                {
                    props.groups.map(group=>(
                        
                        <option key={group.id} value={group.id}>{group.name}</option>
                        
                    ))
                }

                </select>
        </div>
    )
}
export default ScreeningCard;