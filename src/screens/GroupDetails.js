import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroupDetails = () => {
  const { id } = useParams(); // Get the group ID from the URL
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // Fetch group details by ID
    fetch(`http://localhost:3001/groups/${id}`)
      .then((response) => response.json())
      .then((data) => setGroup(data))
      .catch((error) => console.error("Error fetching group details:", error));
  }, [id]);

  if (!group) {
    return <p>Loading group details...</p>;
  }

  return (
    <div>
      <h1>{group.title}</h1>
      <p>{group.description}</p>
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
  );
};

export default GroupDetails;
