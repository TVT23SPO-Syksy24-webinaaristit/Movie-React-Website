import React, { useState, useEffect } from 'react';
import { createGroup } from '../../services/GroupsService';
import { useUser } from '../../contexts/useUser';
import './GroupStyles.css';

const GroupCreation = () => {
  const { user } = useUser();
  console.log('User:', user);
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
  });
  const [groupCreated, setGroupCreated] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log('User context:', user.id);
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.id) {
      setError('You must be logged in to create a group.');
      return;
    }
    try {
      await createGroup(user.id, groupData.name, groupData.description);  // Pass data to createGroup function
      setGroupCreated(true);
      console.log("Sending data:", user.id, groupData.name, groupData.description);
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Failed to create group. Please try again.');
      setGroupCreated(false);
    }
  };

useEffect(() => {
  if (groupCreated) {
    alert('Group created successfully!');
    setGroupData({owner: '', name: '', description: ''});
  }
}, [groupCreated]);

  return (
    <div className='groupbox'>
      <h2>Create a new group</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input
            className='name'
            type='text'
            name='name'
            value={groupData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            className='description'
            name='description'
            value={groupData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Create Group</button>
      </form>
    </div>
  );
};

export default GroupCreation;
