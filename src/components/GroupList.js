import React, { useState, useEffect } from 'react';
import './GroupList.css';

const GroupList = () => {
  const [groups, setGroups] = useState([]); // To store the group list
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To show any fetch errors

  // Fetch group data from the API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3001/groups');
        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.statusText}`);
        }
        const data = await response.json();
        setGroups(data); // Update state with fetched groups
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
    <div className='groupbox'>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
                <h3>{group.title}</h3>, {group.description}</li>
          ))}
        </ul>
      ) : (
        <p>No groups available.</p>
      )}
    </div>
  );
};

export default GroupList;
