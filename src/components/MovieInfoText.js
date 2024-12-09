import React from "react";
import { useState, useEffect } from "react";

const MovieInfoText = (props) => {
    const [details, setDetails] = useState({});

    useEffect(() => {
        if (props.details) {
            setDetails(props.details); // Update state when props.details changes
        }
    }, [props.details]);


    return(
        <div className="movieinfotext">
        <h1>{details?.title}</h1>
        <h4>{details?.release_date?.slice(0,4)} · {details?.genres?.map(titleObject => titleObject.name).join(", ")}</h4>
        
        
        </div>
    )
}

export default MovieInfoText;