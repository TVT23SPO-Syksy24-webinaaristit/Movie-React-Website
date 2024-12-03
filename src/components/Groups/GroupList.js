import React, { useState, useEffect } from "react";
import { fetchAllGroups, joinGroup } from "../../services/GroupsService"; // Import API service functions
import "./GroupStyles.css"; // Import styles (if applicable)

const GroupList = () => {
  const [groups, setGroups] = useState([]); // State to store the fetched groups
  const [loading, setLoading] = useState(true); // State to handle the loading state
  const [error, setError] = useState(null); // State to handle errors
  const [userId] = useState(1); // Example user ID (replace with actual user data if available)

  // Fetch groups from the backend when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetchAllGroups(); // Call the API to get groups
        if (response && Array.isArray(response)) {
          setGroups(response); // Set the groups array
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Failed to load groups. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchGroups();
  }, []);

  // Handle the "Join Group" button click
  const handleJoinGroup = async (groupId) => {
    try {
      const response = await joinGroup(groupId, userId); // Call the API to join a group
      alert(`You successfully joined the group: ${response.name}`);
    } catch (err) {
      console.error("Error joining group:", err);
      alert("Failed to join the group. Please try again.");
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
              <div className="group-content">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <p>
                  <strong>Members:</strong> {group.members}
                </p>
                <button
                  className="join-button"
                  onClick={() => handleJoinGroup(group.id)} // Pass the group ID
                >
                  ➕ Join
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups available.
          Try to create a group instead?
        </p>
      )}
    </div>
  );
};

export default GroupList;
