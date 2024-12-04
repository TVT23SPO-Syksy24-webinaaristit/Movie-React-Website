//server/models/Group.js
import {pool} from "../helpers/db.js";
//Group.js imports connection to database from helper db.js and includes queries related to groups

const selectAllGroups = async (userId) => {
  // Query to get all groups and check if the user is a member
  const result = await pool.query(`
    SELECT 
      g.idgroup,
      g.group_name,
      g.member_count,
      g.group_description,
      COALESCE(m.accounts_idaccount, NULL) AS is_member
    FROM groups g
    LEFT JOIN group_members m ON g.idgroup = m.groups_idgroup AND m.accounts_idaccount = $1
  `, [userId]);

  // Process the result and return an array of groups with membership status
  return result.rows.map(row => ({
    id: row.idgroup,
    name: row.group_name,
    members: row.member_count,
    description: row.group_description,
    isMember: row.is_member !== null // If 'is_member' is not null, the user is a member
  }));
};

//   const result = await pool.query("SELECT idgroup, group_name, member_count, group_description FROM groups");
//   // Make sure the returned values are usable.
//   return result.rows.map(row => ({
//       id: row.idgroup,
//       name: row.group_name,
//       members: row.member_count,
//       description: row.group_description
//   }));
// };

const selectGroupById = async (id) => {
    return await pool.query("SELECT * FROM groups WHERE idgroup = $1",[id]);
};

const insertGroupCreate = async ({ owner, name, description }) => {
  //console.log("Inserting group with data:", { owner, name, description });

  try {
    // Insert the new group
    const groupResult = await pool.query(
      "INSERT INTO groups (group_name, group_description, owner, member_count) VALUES ($1, $2, $3, 1) RETURNING idgroup, group_name, group_description, owner",
      [name, description, owner]
    );

    const groupId = groupResult.rows[0].idgroup; // Get the new group ID

    //console.log("New group created with ID:", groupId);

    // Insert the owner as a member of the group
    await pool.query(
      "INSERT INTO group_members (accounts_idaccount, groups_idgroup, is_a_member, join_date_timestamp) VALUES ($1, $2, $3, NOW())",
      [owner, groupId, 1] // `1` for `is_a_member` means active membership
    );

    console.log("Owner added to group_members table as a member");

    // Return the group details
    return {
      idgroup: groupId,
      group_name: name,
      owner: owner,
      member_count: 1,
      description: description,
    };
  } catch (error) {
    console.error("Error creating group or adding owner as member:", error);
    throw error;
  }
};

const deleteGroupDelete = async (groupId) => {
  const client = await pool.connect();  // Get a client from the pool
  try {
    // Start a transaction
    await client.query('BEGIN');

    // Delete from group_highlights
    await client.query('DELETE FROM group_highlights WHERE group_id = $1', [groupId]);

    // Delete from group_members
    await client.query('DELETE FROM group_members WHERE group_id = $1', [groupId]);

    // Delete from groups
    await client.query('DELETE FROM groups WHERE id = $1', [groupId]);

    // Commit the transaction
    await client.query('COMMIT');
    
    console.log('Group and related data deleted successfully.');
  } catch (error) {
    // If any query fails, roll back the transaction
    await client.query('ROLLBACK');
    console.error('Error deleting group data:', error);
    throw error;
  } finally {
    // Release the client back to the pool
    client.release();
  }
};

const selectGroupIfMember = async (groups_idgroup, accounts_idaccount) => {
  const result = await pool.query("SELECT * FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2",[accounts_idaccount, groups_idgroup]);
  return result.rows.length > 0;
};

const insertGroupJoin = async (groups_idgroup, accounts_idaccount) => {
  const existingMember = await pool.query("SELECT * FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2",[accounts_idaccount, groups_idgroup]);
  if (existingMember.rows.length > 0) {
    throw new Error("User already in group");
  }
  return await pool.query("INSERT INTO group_members (accounts_idaccount, groups_idgroup, is_a_member) VALUES ($1, $2, $3) RETURNING *",[accounts_idaccount, groups_idgroup, 1]);

};

export {selectAllGroups, selectGroupById, insertGroupCreate, deleteGroupDelete, insertGroupJoin, selectGroupIfMember};


// const groupId = result.rows[0].idgroup; // Get the group ID from the result

// await pool.query(
//   "INSERT INTO groups_members (accounts_idaccount, groups_idgroup, is_a_member, join_date_timestamp) VALUES ($1, $2, 1, NOW())",
//   [userId, groupId]
// );

//   return { idgroup: groupId, group_name: name, owner: userId, member_count: 1, description };