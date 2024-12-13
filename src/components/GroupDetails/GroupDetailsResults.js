import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import GroupDetailsHighlightCard from "./GroupDetailsHighlightCard";
import GroupDetailsMemberCard from "./GroupDetailsMemberCard";
import GroupDetailsJoinRequesterCard from "./GroupDetailsJoinRequesterCard";
import { useGroups } from "../../contexts/GroupProvider";
import { useUser } from "../../contexts/useUser"
import DeleteGroupButton from "./DeleteGroupButton";
import "./GroupDetailsResults.css";
import LeaveGroupButton from "./LeaveGroupButton";


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
          const response = await fetchGroupDetails(id);
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

  }, [id,user.id,member.owner]);
  
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
      <div className="highlightList">
      <h3>Group highlights</h3>
      {highlight && highlight.length > 0 ? (
        highlight.map(highlight => (
          <GroupDetailsHighlightCard key={highlight.idgroup_highlight}
            title={highlight.title}
            link_url={highlight.source_link_url}
            description={highlight.description}
            image={highlight.poster_url}
            account={highlight.username}
            highlightid={highlight.idgroup_highlight}
          />
        ))

      ) : (typeof (highlight) === "object" && !Array.isArray(highlight)) ? (
        <GroupDetailsHighlightCard key={highlight.idgroup_highlight}
          title={highlight.title}
          link_url={highlight.source_link_url}
          description={highlight.description}
          image={highlight.poster_url}
          account={highlight.username}
          highlightid={highlight.idgroup_highlight}
        />
      ) : (
        <p>Loading highlights...</p>
      )}
      </div>
      <h3>Group members</h3> 
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

      <div className="requesterList">
{user.id == group.owner ?(
       <h3>Pending join requests:</h3> 
      ):(
        <br />
      )}
{joinRequester && user.id == group.owner && joinRequester.length > 0  ? (      

joinRequester.map(joinRequester => (
  <GroupDetailsJoinRequesterCard key={joinRequester.id}
    username={joinRequester.username}
    
    date={new Date(joinRequester.group_request_timestamp).toUTCString()}
    showAnswerButtons={1}
    groupid={joinRequester.groups_idgroup}
    accountid={joinRequester.accounts_idaccount}
   /*  {user.id === group.owner ? (
      showAnswerButtons={1}
    ):(
      showAnswerButtons={0}
    )} */

  />
  

))
) : (typeof (joinRequester) === "object" && !Array.isArray(joinRequester) && user.id == group.owner) ? (
<div>
  <p>List of sent join requests:</p>
<GroupDetailsJoinRequesterCard key={joinRequester.id}
  username={joinRequester.username}
  date={new Date(joinRequester.group_request_timestamp).toUTCString()}
    showAnswerButtons={1}
    groupid={joinRequester.groups_idgroup}
    accountid={joinRequester.accounts_idaccount}
/>
</div>
) : (user.id == group.owner)? (
<p>Loading join requester list...</p>
) : (
  <br />
)}
</div>
<LeaveGroupButton groupid={group.idgroup}/>

  {user.id == group.owner ?(
       <DeleteGroupButton groupid={group.idgroup}/>
      ):(
        <br />
      )}
  
    </div>
  )

}


/*
- Todo list:



remove a member from group

add highlights from movies 

remove highlight


*/

export { GroupDetailsResults };