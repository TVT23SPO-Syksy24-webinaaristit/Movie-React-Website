//src/contexts/GroupProvider.js
import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // API URL

const GroupContext = createContext();

// Custom hook to use the group context
export function useGroups() {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
}

export const GroupProvider = ({ children }) => {
  const { user } = useContext(UserContext); // Access user from UserContext

  // Fetch all groups
  
  const fetchAllGroups = async (userId) => {
    // Pass both the Bearer token and userId correctly in the headers
    const headers = {
      Authorization: user.token, // For Bearer token authentication
      'user-id': userId,  // Custom header for userId
    };
  
    sessionStorage.setItem("user.id", userId);
  
    try {
      // Send the headers with the GET request
      const response = await axios.get(`${API_URL}/groups`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  };
  
  const createGroup = async (userId, groupName, groupDescription) => {
    const headers = {
        Authorization: user.token,
    };
    try {
        console.log("User ID:", user.id);  // Ensure this logs the correct user ID
      console.log("headers:", headers);  // Ensure the headers are correct
      const response = await axios.post(`${API_URL}/groups/create`, {
        owner: userId,
        name: groupName,
        description: groupDescription,
      }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  // Delete a group
  const deleteGroup = async (groupId) => {
    const headers = {
        Authorization: user.token,
    };
    try {
      const response = await axios.delete(`${API_URL}/groups/${groupId}`,
        { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  };


  // Join a group
  const joinGroup = async (groupId,accountid) => {
    const headers = {
        Authorization: user.token,
     };
    try {
      const response = await axios.post(`${API_URL}/groups/join`, {
        groups_idgroup: groupId,
        accounts_idaccount: accountid,
      }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  };

  const sendGroupJoinRequest = async (groupId) => {
    const headers = {
        Authorization: user.token,
     };
    try {
      const response = await axios.post(`${API_URL}/groups/sendjoinrequest`, {
        groups_idgroup: groupId,
        accounts_idaccount: user.id,
      }, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error requesting to join a group:', error);
      throw error;
    }
  };

  const createHighlight = async(groupId,poster,titletext,idevent,descriptiontext,source_link) =>{
    const headers = {'Content-Type': 'application/json',
      Authorization: user.token};
    try {
    const data = {
      groups_idgroup: groupId,
      accounts_idaccount: user.id,
      poster_url: poster,
      title: titletext,
      idmovie_or_event: idevent,
      description: descriptiontext,
      source_link_url: source_link
    };
    console.log(data)

    
      const response = await axios.post(`${API_URL}/groups/highlightcreate`, data, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating a highlight:', error);
      throw error;
    }
  };

  const deleteHighlight = async (highlightId) => {
    const headers = {
        Authorization: user.token,
    };
    console.log(highlightId)
    try {
      const response = await axios.delete(`${API_URL}/groups/${highlightId}/highlight`,
        { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting highlight:', error);
      throw error;
    }
  };

  // Leave a group
  const leaveGroup = async (groupId,accountId) => {
    if(accountId==null){
      accountId = user.id;
    }
    console.log(accountId)
    const headers = {
        Authorization: user.token, 
    };
    try {
        const response = await axios.delete(`${API_URL}/groups/${groupId}/leave?accountId=${accountId}`, {
            headers,
        });
      return response.data;
    } catch (error) {
      console.error('Error leaving group:', error);
      throw error;
    }
  };

  const fetchGroupDetails = async(groupId) =>{
    const headers = {
      
    };
    try{
      console.log(groupId);
      const response = await axios.get(`${API_URL}/groups/${groupId}`, {headers}
      )
      console.log(response.data)
      return response.data;
      
    }catch(error){
      console.error('Error fetching groupdetails:', error);
      throw error;
    }

  }

  const fetchHighlightDetails = async(groupId) =>{
    const headers = {
      
    };
    try{
      console.log(groupId);
      const response = await axios.get(`${API_URL}/groups/highlights/${groupId}`, {headers}
      )
      console.log(response.data)
      return response.data;
      
    }catch(error){
      console.error('Error fetching highlights:', error);
      throw error;
    }
  }

  const fetchGroupMemberDetails = async(groupId) =>{
    const headers = {
      
    };
    try{
      console.log(groupId);
      const response = await axios.get(`${API_URL}/groups/${groupId}/members`, {headers}
      )
      console.log(response.data)
      return response.data;
      
    }catch(error){
      console.error('Error fetching members:', error);
      throw error;
    }
  }

  const fetchrequesterDetails = async(groupId) =>{
    const headers = {
      
    };
    try{
      console.log(groupId);
      const response = await axios.get(`${API_URL}/groups/${groupId}/requesters`, {headers}
      )
      console.log(response.data)
      return response.data;
      
    }catch(error){
      console.error('Error fetching join requesters:', error);
      throw error;
    }
  }

  return (
    <GroupContext.Provider value={{ fetchAllGroups, joinGroup, sendGroupJoinRequest, leaveGroup, createGroup, createHighlight, 
    deleteHighlight, deleteGroup, 
    fetchGroupDetails, fetchHighlightDetails, fetchGroupMemberDetails, fetchrequesterDetails }}>
      {children}
    </GroupContext.Provider>
  );
};
