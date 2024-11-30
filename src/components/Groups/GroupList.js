import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupList.css';

const GroupList = () => {
  const [groups, setGroups] = useState([]); // To store the group list
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To show any fetch errors
  const navigate = useNavigate();

  const handleGroupClick = (id) => {
    navigate(`/groups/${id}`); //navigate to the group details page
  };

  // Fetch group data from the API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3001/groups');
        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.statusText}`);
        }
        const data = await response.json();
        setGroups(data); // Set the fetched groups as available
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []); // Empty dependency array ensures it runs once on mount

  if (loading) return <p>Loading groups...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message if any

  return (
    <div className="groupbox">
      {groups.length > 0 ? (
        <ul className="group-list">
          {groups.map((group) => (
            <li className="group-item" 
            key={group.id}
            onClick={() => handleGroupClick(group.id)} // Navigate on click
              style={{ cursor: "pointer" }} // Optional: indicate the item is clickable
            >
              <div className="group-content">
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <button className="join-button" onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering group click
                    console.log(`Joining group ${group.id}`);
                  }}>
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
