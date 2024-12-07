import React, { useCallback, useEffect, useState } from "react";
import ScreeningCard from "./ScreeningCard"
import "./ScreeningResults.css"


const ScreeningResults = () =>{

    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [screenings, setScreenings] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);


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
        fetch(`https://www.finnkino.fi/xml/Schedule/?area=${area}&dt=${date}`)
        .then(response => response.text())
        .then(xml =>{
            const screeningsjson = parseXML(xml);
            console.log(screeningsjson.Schedule.Shows.Show);
            setScreenings(screeningsjson.Schedule.Shows.Show);
            console.log("getfinnkinoscreenings")
        })
        .catch(error =>{
            errorHandler(error);
        })
    }
    const getScreeningDates = (area) =>{
        fetch("https://www.finnkino.fi/xml/ScheduleDates/?area="+area)
        .then(response => response.text())
        .then(xml =>{
            const datesjson = parseXML(xml);
            console.log(datesjson)
            const datesArray = datesjson.Dates.dateTime;
            
            const formattedDateArray = [];
            
            for(var i=0;datesArray.length >i; i++ ){
                var unformattedDate = new Date(datesArray[i]);
                unformattedDate.setDate(unformattedDate.getDate() + parseInt(1));
                formattedDateArray[i] = unformattedDate.toISOString().replace(/T.*/,'').split('-').reverse().join('.')
            }
            console.log(formattedDateArray);
            setDates(formattedDateArray);
        })
        .catch(error =>{
            errorHandler(error);
        })
    }

    
    const parseXML = useCallback((xml) =>{
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml,"application/xml");
        return xmlToJson(xmlDoc);
    }, [xmlToJson])


    useEffect(() =>{    
        fetch("https://www.finnkino.fi/xml/TheatreAreas/")
        .then(response => response.text())
        .then(xml => {
            /* console.log(xml);
            getFinnkinoTheatres(xml); */
            const areajson = parseXML(xml)
            //console.log(areajson.TheatreAreas.TheatreArea);
            setAreas(areajson.TheatreAreas.TheatreArea);
        })
        .catch(error =>
        {
            errorHandler(error);
        }
        )
        fetch("https://www.finnkino.fi/xml/Schedule/")
        .then(response => response.text())
        .then(xml =>{
            const screeningsjson = parseXML(xml);
            console.log(screeningsjson.Schedule.Shows.Show);
            setScreenings(screeningsjson.Schedule.Shows.Show);
        })
        .catch(error =>{
            errorHandler(error);
        })

    }, [parseXML])

    const errorHandler = (error)=>{
        error===null ? (console.log("unknown error")) : (console.log(error.response))
    }

    const handleChange = (e, type) =>{
        switch(type){
            case "Theatre":
                setSelectedArea(e);
                getScreeningDates(e);
                getFinnkinoScreenings(e,selectedDate);
                console.log("Theatre changed")
                console.log(e)
                break;
            case "Date":
                setSelectedDate(e);
                getFinnkinoScreenings(selectedArea,e);
                console.log("Date changed")
                console.log(e)
                break;
            default:
                console.log("handlechange error");
        }

    }

    return(
        <div className="screeningResults">
            <h1>Finnkino Screenings</h1>
            <div className="screeningMenus">
                <div className="selectTheatre">
                    <h3>Choose Theatre</h3>
                    <select name="selectTheatre" id="selectTheatre" onChange={(area) => handleChange(area.target.value,"Theatre")}>
                        {
                            areas.map(area => (
                                <option value={area.ID} key={area.ID}>{area.Name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="selectDate">
                    <h3>Choose Date</h3>
                    <select name="selectDate" id="selectDate" onChange={(date) => handleChange(date.target.value,"Date")}>
                        {
                             dates.map((date,id) =>(
                                <option value={date} key={id}>{date}</option>
                            )) 
                        }
                    </select>
                    <div className="icon-container">
                        <i></i>
                    </div>
                </div>
            </div>

                <div className="screening">
                    { screenings && screenings.length > 0 ? ( 
                        screenings.map(screenings =>(
                            <ScreeningCard  key={screenings.ID} 
                            title={screenings.Title} 
                            finnkinoUrl={screenings.EventURL}
                            hours={new Date(screenings.dttmShowStart).getHours()} 
                            minutes={new Date(screenings.dttmShowStart).getMinutes().toString().padStart(2, '0')}
                            image={screenings.Images.EventMediumImagePortrait}
                            auditorium={screenings.TheatreAndAuditorium} />
                            ))
                    ) : (
                        <p>Loading...</p>
                    )
                    } 
                </div>
        </div>
    )
}

export default ScreeningResults;