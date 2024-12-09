import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import GroupDetailsHighlightCard from "./GroupDetailsHighlightCard";
import GroupDetailsMemberCard from "./GroupDetailsMemberCard";
import GroupDetailsJoinRequesterCard from "./GroupDetailsJoinRequesterCard";
import { useGroups } from "../../contexts/GroupProvider";
import { useUser } from "../../contexts/useUser"
import DeleteGroupButton from "./DeleteGroupButton";


const GroupDetailsResults = () => {
  const { fetchGroupDetails, fetchHighlightDetails, fetchGroupMemberDetails, fetchrequesterDetails } = useGroups();
  const { id } = useParams(); // Get the group ID from the URL
  const [group, setGroup] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [member, setMember] = useState([]);
  const [joinRequester, setJoinRequester] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    // Fetch group details by ID

      const fetchGroupInfo = async() =>{
        try{
          console.log("fetchGroupInfo")
          const response = await fetchGroupDetails(id);
          console.log(response.rows[0]);
          setGroup(response.rows[0])
        }catch(error){
          console.log(error);
        } 
      }

      const fetchHighlights = async() =>{
        try{
          const response = await fetchHighlightDetails(id);
          setHighlight(response.rows);
          }catch(error){
          console.log(error);
        }
      }
      const fetchGroupMembers = async() =>{
        try{
          const response = await fetchGroupMemberDetails(id);
          setMember(response.rows);
          }catch(error){
          console.log(error);
        }
      }

      const fetchrequesters = async() =>{
        try{
          const response = await fetchrequesterDetails(id);
          setJoinRequester(response.rows);
          }catch(error){
          console.log(error);
        }
      }

      fetchGroupInfo();
      fetchHighlights();
      fetchGroupMembers();
      fetchrequesters();

  }, [id]);
  
  console.log(group);
  console.log(highlight);
  console.log(member);
  console.log(joinRequester);
  console.log(user);

  return (
    <div className="groupDetails">
      
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


      {member && member.length > 0 ? (      // Group member can be kicked using the already existing groupLeave routing and front end implementation.

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

{joinRequester && joinRequester.length > 0 ? (      

joinRequester.map(joinRequester => (
  <GroupDetailsJoinRequesterCard key={joinRequester.id}
    username={joinRequester.username}
    showAnswerButtons={1}
    groupid={joinRequester.groups_idgroup}
   /*  {user.id === group.owner ? (
      showAnswerButtons={1}
    ):(
      showAnswerButtons={0}
    )} */

  />
  

))
) : (typeof (joinRequester) === "object" && !Array.isArray(joinRequester)) ? (
<GroupDetailsJoinRequesterCard key={joinRequester.id}
  username={joinRequester.username}
/>
) : (
<p>Loading join requester list...</p>
)}

  <DeleteGroupButton />
    </div>
  )

}


/*
- Todo list:

request-to-join-a-group -button

group deletion button

remove a member from group

accept and deny join requests




*/

export { GroupDetailsResults };