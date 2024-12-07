import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import GroupDetailsHighlightCard from "./GroupDetailsHighlightCard";
import GroupDetailsMemberCard from "./GroupDetailsMemberCard";
import { useGroups } from "../../contexts/GroupProvider";


const GroupDetailsResults = () => {
  const { fetchGroupDetails } = useGroups();
  const { id } = useParams(); // Get the group ID from the URL
  const [group, setGroup] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(() => {
    // Fetch group details by ID
    /* fetch(`http://localhost:3001/groups/${id}`)
      .then((response) => response.json())
      .then((data) => setGroup(data.rows[0]))
      .catch((error) => console.error("Error fetching group details:", error)); */

      const fetchGroupInfo = async() =>{
        try{
          const response = await fetchGroupDetails(id);
          console.log(response)
          setGroup(response)
        }catch(error){
          console.log(error);
        }
      }

    fetch(`http://localhost:3001/groups/highlights/${id}`)
      .then((response) => response.json())
      .then((data) => setHighlight(data.rows))
      .catch((error) => console.error("Error fetching group details:", error));


    fetch(`http://localhost:3001/groups/${id}/members`)
      .then((response) => response.json())
      .then((data) => setMember(data.rows))
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
  console.log(member);

  return (
    <div>
      {group && group.length !== null ? (
        <div>
          <h1>{group.group_name}</h1>
          <p>{group.group_description}</p>
        </div>
      ) : (
        <p>Loading group details...</p>
      )}
      {highlight && highlight.length > 0 ? (
        highlight.map(highlight => (
          <GroupDetailsHighlightCard key={highlight.idgroup_highlight}
            title={highlight.title}
            link_url={highlight.source_link_url}
            image={highlight.poster_url}
            account={highlight.username}
          />
        ))

      ) : (typeof (highlight) === "object" && !Array.isArray(highlight)) ? (
        <GroupDetailsHighlightCard key={highlight.idgroup_highlight}
          title={highlight.title}
          link_url={highlight.source_link_url}
          image={highlight.poster_url}
          account={highlight.username}
        />
      ) : (
        <p>Loading highlights...</p>
      )}


      {member && member.length > 0 ? (

        member.map(member => (
          <GroupDetailsMemberCard key={member.id}
            username={member.username}

          />
        ))
      ) : (typeof (member) === "object" && !Array.isArray(member)) ? (
        <GroupDetailsMemberCard key={member.id}
          username={member.username}

        />
      ) : (
        <p>Loading memberlist...</p>
      )}



    </div>
  )

}

export { GroupDetailsResults };