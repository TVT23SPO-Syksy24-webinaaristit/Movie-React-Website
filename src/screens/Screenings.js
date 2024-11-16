import React, { useEffect, useState } from "react";
import "./Screenings.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Screenings(){

    const [areas, setAreas] = useState([]);

    const getFinnkinoTheatres = (xml) =>{

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml,"application/xml");
        
        const root = xmlDoc.children
        
        const theatres = root[0].children
        const tempAreas = []
        for(let i = 0;i< theatres.length;i++){
            tempAreas.push(
                {
                "id": theatres[i].children[0].innerHTML,
                "name": theatres[i].children[1].innerHTML    
                }
            )
        }
        setAreas(tempAreas);
    }

    useEffect(() =>{
        fetch("https://www.finnkino.fi/xml/TheatreAreas/")
        .then(response => response.text())
        .then(xml => {
            console.log(xml);
            getFinnkinoTheatres(xml);
        })
        .catch(error =>
        {
            console.log(error);
        }
        )

    }, [])


    return(
        <div className="Screenings">
            <Navbar />
                <div>
                    <select>
                        {
                            areas.map(area => (
                                <option key={area.id}>{area.name}</option>
                            ))
                        }
                    </select>
                </div>

            <Footer />
        </div>
    );
};

export default Screenings;