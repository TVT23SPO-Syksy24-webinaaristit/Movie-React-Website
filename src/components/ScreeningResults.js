import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";


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

    const updateScreenings = async (area,date) =>{
        /* try{ */
            const url = `https://www.finnkino.fi/xml/Schedule/?area=${area}&dt=${date}`;
            let response = await axios.get(url)
            .then(response => response.text())
            const screeningsjson = parseXML(response);              // WORK IN PROGRESS, IGNORE THIS FUNCTION
            console.log(screeningsjson.Schedule.Shows.Show);
            /* .then(response => response.text())
            .then(xml =>{
                const screeningsjson = parseXML(xml);
                console.log(screeningsjson.Schedule.Shows.Show);
                setScreenings(screeningsjson.Schedule.Shows.Show);
                console.log("getfinnkinoscreenings")
            }) */
            

       /*  } catch(error){
            errorHandler(error);
        } */
    }


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
            console.log(error);
        })
    }
    const getScreeningDates = (area) =>{
        fetch("https://www.finnkino.fi/xml/ScheduleDates/?area="+area)
        .then(response => response.text())
        .then(xml =>{
            const datesjson = parseXML(xml);
            const datesArray = datesjson.Dates.dateTime;
            
            const formattedDateArray = [];
            
            for(var i=0;datesArray.length >i; i++ ){
                formattedDateArray[i] = new Date(datesArray[i]).toISOString().replace(/T.*/,'').split('-').reverse().join('.')
            }
            console.log(formattedDateArray);
            setDates(formattedDateArray);
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
            console.log(error);
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
            console.log(error);
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
        <div className="ScreeningResults">
            <div
                 style={{
                  display: "flex", 
                  alignitems: "left"
                   
                 }}
                >
                    <select name="selectTheatre" onChange={(area) => handleChange(area.target.value,"Theatre")}>
                        {
                            areas.map(area => (
                                <option value={area.ID} key={area.ID}>{area.Name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <select name="selectDate" onChange={(date) => handleChange(date.target.value,"Date")}>
                        {
                             dates.map((date,id) =>(
                                <option value={date} key={id}>{date}</option>
                            )) 
                        }
                    </select>
                </div>
                <div
                 style={{
                 display: "flex", flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center"
                }}>
                
                    
                    { screenings && screenings.length > 0 ? (
                        screenings.map(screenings =>(
                                <div key={screenings.ID}>{screenings.Title}
                                <br />
                                <p>Esitys alkaa: {new Date(screenings.dttmShowStart).getHours()}:{new Date(screenings.dttmShowStart).getMinutes()}</p>
                                <br />
                                    <img src={screenings.Images.EventSmallImagePortrait} alt="Screening"></img>
                                   
                                 </div> 
                               
                                //new Date(screenings.dttmShowStart).toISOString().replace(/T.*/,'').split('-').reverse().join('.')
                        ))
                    ) : (
                        <p>Loading...</p>
                    )
                    }
                    <style>
                        
                    </style>
                </div>
        </div>
    )
}

export default ScreeningResults;