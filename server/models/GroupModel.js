import { pool } from "../helpers/db.js";

export const GroupModel = {
  // Fetch all groups
  async fetchAllGroups() {
    const query = "SELECT * FROM groups";
    const result = await pool.query(query);
    return result.rows; // Return rows from the database
  },

  // Fetch a group by ID
  async fetchGroupById(groupId) {
    const query = "SELECT * FROM groups WHERE idgroup = $1";
    const result = await pool.query(query, [groupId]);
    if (result.rows.length === 0) {
      throw new Error("Group not found");
    }
    return result.rows[0]; // Return the first matching row
  },

  // Add a new group
  async createGroup(groupData) {
    const query = `
      INSERT INTO groups (group_name, description) 
      VALUES ($1, $2) 
      RETURNING *`;
    const values = [groupData.title, groupData.description];
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly created group
  }
};
