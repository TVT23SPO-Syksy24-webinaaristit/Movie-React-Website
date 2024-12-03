import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//should have a button to create a new group on the database


const GroupDetails = () => {
  const { id } = useParams(); // Get the dynamic group ID from the URL
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // Fetch group details from the server
    fetch(`http://localhost:3001/groups/${id}`) // Adjust the URL as needed for your API
      .then(response => response.json())
      .then(data => setGroup(data))
      .catch(error => console.error("Error fetching group details:", error));
  }, [id]);

  if (!group) {
    return <p>Loading group details...</p>;
  }

  return (
    <div>
      <h1>{group.group_name}</h1>
      <p>{group.description}</p>
      {/* You can add more details or components here */}
    </div>
  );
};

export default GroupDetails;
