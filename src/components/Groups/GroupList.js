import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllGroups } from '../../services/groupService'; // Import fetch function
import './GroupList.css';

const GroupList = () => {
  const [groups, setGroups] = useState([]); // To store the fetched groups
  const [loading, setLoading] = useState(true); // To indicate loading state
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  // Fetch the group data on component mount
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchAllGroups();
        setGroups(data); // Store the data in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    loadGroups();
  }, []); // Empty dependency array ensures this runs only once

  // Function to handle navigation to a group's details page
  const handleGroupClick = (id) => {
    navigate(`/groups/${id}`);
  };

  if (loading) return <p>Loading groups...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message if any

  return (
    <div className="groupbox">
      {groups.length > 0 ? (
        <ul className="group-list">
          {groups.map((group) => (
            <li
              className="group-item"
              key={group.id}
              onClick={() => handleGroupClick(group.id)} // Navigate to group details
              style={{ cursor: 'pointer' }} // Optional: indicate the item is clickable
            >
              <div className="group-content">
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <button
                  className="join-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the group click event
                    console.log(`Joining group ${group.id}`);
                  }}
                >
                  <span className="join-icon">➕</span> Join
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups available.</p>
      )}
    </div>
  );
};

export default GroupList;
