import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import GroupDetailsHighlightCard from "./GroupDetailsHighlightCard";

const GroupDetailsResults = () =>{

    const { id } = useParams(); // Get the group ID from the URL
    const [group, setGroup] = useState([]);
    const [highlight, setHighlight] = useState([]);
  
    useEffect(() => {
      // Fetch group details by ID
      fetch(`http://localhost:3001/groups/${id}`)
        .then((response) => response.json())
        .then((data) => setGroup(data.rows[0]))
        .catch((error) => console.error("Error fetching group details:", error));

        fetch(`http://localhost:3001/groups/highlights/6`)
        .then((response) => response.json())
        .then((data) => setHighlight(data.rows))
        .catch((error) => console.error("Error fetching group details:", error));

       /*  try{
            const response = await axios.get(`http://localhost:3001/groups/${id}`);
            return response;
            console.log(response)
        }catch(error){
            console.log("error",error);
            throw error;
        } */

        
    }, [id]);
    
    console.log(group);
    console.log(highlight);

    return(
        <div>
            {group && group.length !== null ?(
            <div>
            <h1>{group.group_name}</h1>
            <p>{group.group_description}</p>
            </div>
        ) : (
            <p>Loading group details...</p>
        )}
            {highlight && highlight.length > 0 ?(
                highlight.map(highlight =>(
                    <GroupDetailsHighlightCard key={highlight.idgroup_highlight}
                    title={highlight.title}
                    link_url={highlight.source_link_url}
                    image={highlight.poster_url}

                    />
                ))
                
            ) : (
                <p>Loading group details...</p>
            )}
        
      
      {/* {group.members && (
        <div>
          <h2>Members:</h2>
          <ul>
            {group.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
    )

}

export {GroupDetailsResults};