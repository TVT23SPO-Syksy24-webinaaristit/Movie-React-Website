// services/groupService.js
const API_URL = process.env.REACT_APP_API_URL;

export const fetchAllGroups = async () => {
  const response = await fetch(`${API_URL}/groups`);
  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }
  return response.json();
};

export const fetchGroupById = async (id) => {
  const response = await fetch(`${API_URL}/groups/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch group details");
  }
  return response.json();
};
