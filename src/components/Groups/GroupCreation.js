import React, { useState, useEffect } from 'react';
import { createGroup } from '../../services/GroupsService';
import './GroupStyles.css';

const GroupCreation = () => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
  });
  const [groupCreated, setGroupCreated] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGroup(groupData);  // Pass data to createGroup function
      setGroupCreated(true);
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Failed to create group. Please try again.');
      setGroupCreated(false);
    }
  };

  useEffect(() => {
    if (groupCreated) {
      alert('Group created successfully!');
      setGroupData({ name: '', description: '' });
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
