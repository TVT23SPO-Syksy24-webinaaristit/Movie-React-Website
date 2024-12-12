//src/components/Groups/GroupList.js
import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/useUser"; // Import the user context
import { useGroups } from "../../contexts/GroupProvider";
import "./GroupStyles.css"; // Import styles (if applicable)
import { useNavigate } from "react-router-dom";

const GroupList = ({ refresh, setRefresh }) => {
  const { fetchAllGroups, joinGroup, leaveGroup, deleteGroup } = useGroups(); // Import the group context
  const [groups, setGroups] = useState([]); // State to store the fetched groups
  const [loading, setLoading] = useState(true); // State to handle the loading state
  const [error, setError] = useState(null); // State to handle errors
  const { user } = useUser(); // Get the user object from the context

  const navigate = useNavigate();

  // Fetch groups from the backend when the component mounts or refresh changes
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetchAllGroups(user.id); // Pass user ID to fetchAllGroups
        if (response && Array.isArray(response)) {
          setGroups(response); // Set the groups array
        } else {
          setError("No groups available or invalid data.");
        }
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Failed to load groups. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchGroups();
  }, [refresh, user.id]); // Trigger refetching when refresh or user ID changes

  // Handle the "Join Group" button click
  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId, user.id); // Call the API to join a group
      alert(`You successfully joined the group`);
      setRefresh(prev => !prev); // Toggle refresh to trigger a re-fetch
    } catch (err) {
      console.error("Error joining group:", err);
      alert("Failed to join the group. Please try again.");
    }
  };

  // Handle the "Leave Group" button click
  const handleLeaveGroup = async (groupId) => {
    try {
      await leaveGroup(groupId, user.id); // Call the API to leave a group
      alert(`You successfully left the group`);
      setRefresh(prev => !prev); // Toggle refresh to trigger a re-fetch
    } catch (err) {
      console.error("Error leaving group:", err);
      alert("Failed to leave the group. Please try again.");
    }
  };

  // Handle the "Delete Group" button click
  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId); // Call the API to delete a group
      setGroups(groups.filter((group) => group.id !== groupId)); // Remove the deleted group from the list
      alert(`You successfully deleted the group: ${groupId}`);
      setRefresh(prev => !prev); // Toggle refresh to trigger a re-fetch
    } catch (err) {
      console.error("Error deleting group:", err);
      alert("Failed to delete the group. Please try again.");
    }
  };

  const handleGroupPageNavigate = async(groupId)=>{
    try{
      navigate(`/groupdetails/${groupId}`);
    } catch(err){
      console.error("Error navigating to group page:", err);
      alert("Failed to go to group page. Please try again.");
    }
  };

  // Render the loading spinner, error message, or group list
  if (loading) return <p>Loading groups...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="groupbox">
      {groups.length > 0 ? (
        <ul className="group-list">
          {groups.map((group) => (
            <li key={group.id} className="group-item">
              <div className="group-content" onClick={()=>
                group.isMember ? (handleGroupPageNavigate(group.id)):(alert("Not a group member"))}>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <p>
                  <strong>Members:</strong> {group.members}
                </p>
                {group.isMember ? (
                  <button className="join-button" disabled>
                    ✅ Joined
                  </button>
                ) : (
                  <button
                    className="join-button"
                    onClick={()=>
                      handleJoinGroup(group.id)} // Pass the group ID
                  >
                    ➕ Join
                  </button>
                )}
                {group.isMember && (
                  group.isOwner ? (
                    <button className="join-button" onClick={() => handleDeleteGroup(group.id)}>
                      😭 Delete Group
                    </button>
                  ) : (
                    <button
                      className="join-button"
                      onClick={() => handleLeaveGroup(group.id)} // Pass the group ID
                    >
                      😢 Leave
                    </button>
                  )
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups available. Try to create a group instead?</p>
      )}
    </div>
  );
};

export default GroupList;
