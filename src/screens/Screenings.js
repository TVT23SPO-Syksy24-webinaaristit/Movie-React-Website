import React, { useCallback, useEffect, useState } from "react";
import "./Screenings.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Screenings(){

    const [areas, setAreas] = useState([]);

    const [screenings, setScreenings] = useState([]);

    const xmlToJson = useCallback((node) =>{
        const json = {}

        let children = [...node.children]
  
        if(!children.length) return node.innerHTML;

        for(let child of children){
        
            const hasSiblings = children.filter(c => c.nodeName === child.nodeName).length > 1

            if (hasSiblings) {
                if (json[child.nodeName] === undefined) {
                    json[child.nodeName] = [xmlToJson(child)];
                } else {
                    json[child.nodeName].push(xmlToJson(child));
                }
            } else {
                json[child.nodeName] = xmlToJson(child);
            }
        }
        return json
    }, [])

    const getFinnkinoScreenings = (area,date) =>{
        fetch("https://www.finnkino.fi/xml/Schedule/?area="+area+"&dt="+date)
        .then(response => response.text())
        .then(xml =>{
            const screeningsjson = parseXML(xml);
            console.log(screeningsjson.Schedule.Shows.Show);
            setScreenings(screeningsjson.Schedule.Shows.Show);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    
    const parseXML = useCallback((xml) =>{
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml,"application/xml");
        return xmlToJson(xmlDoc);
    }, [xmlToJson])


    useEffect(() =>{
        let area="1039";
        let date="19.11.2024"
        fetch("https://www.finnkino.fi/xml/TheatreAreas/")
        .then(response => response.text())
        .then(xml => {
            /* console.log(xml);
            getFinnkinoTheatres(xml); */
            const areajson = parseXML(xml)
            console.log(areajson.TheatreAreas.TheatreArea);
            setAreas(areajson.TheatreAreas.TheatreArea);
        })
        .catch(error =>
        {
            console.log(error);
        }
        )
        fetch("https://www.finnkino.fi/xml/Schedule/?area="+area+"&dt="+date)
        .then(response => response.text())
        .then(xml =>{
            const screeningsjson = parseXML(xml);
            console.log(screeningsjson.Schedule.Shows.Show);
            setScreenings(screeningsjson.Schedule.Shows.Show);
        })
        .catch(error =>{
            console.log(error);
        })
    }, [parseXML])


    return(
        <div className="Screenings">
            <Navbar />
                <div>
                    <select name="selectTheatre" onChange={(area) => getFinnkinoScreenings(area.target.value)}>
                        {
                            areas.map(area => (
                                <option value={area.ID} key={area.ID}>{area.Name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    
                    { screenings && screenings.length > 0 ? (
                        screenings.map(screenings =>(
                                <p key={screenings.ID}>{screenings.Title}</p>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )
                    }
                    
                </div>

            <Footer />
        </div>
    );
};

export default Screenings;