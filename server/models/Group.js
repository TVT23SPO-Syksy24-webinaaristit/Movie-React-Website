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
      g.owner,
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
    isMember: row.is_member !== null, // If 'is_member' is not null, the user is a member
    isOwner: parseInt(row.owner) === parseInt(userId)// If 'owner' is the same as the user ID, the user is the owner
  }));
};



const selectGroupById = async (id) => {
    return await pool.query("SELECT * FROM groups WHERE idgroup = $1",[id]);
};

const selectGroupHighlights = async(groups_idgroup) =>{
  return await pool.query("SELECT gh.*, a.username FROM group_highlights gh JOIN accounts a ON gh.accounts_idaccount = a.idaccount WHERE groups_idgroup = $1",[groups_idgroup]);
};

const selectAllGroupMembers = async(groups_idgroup) =>{
  return await pool.query("SELECT gm.*,a.username FROM group_members gm JOIN accounts a ON gm.accounts_idaccount = a.idaccount WHERE groups_idgroup = $1 AND is_a_member = '1'",[groups_idgroup]);
};

const selectAllGroupJoinRequesters = async(groups_idgroup) =>{
  return await pool.query("SELECT gm.*,a.username FROM group_members gm JOIN accounts a ON gm.accounts_idaccount = a.idaccount WHERE groups_idGroup = $1 AND is_a_member = '0' ORDER BY group_request_timestamp ASC",[groups_idgroup]);
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

const deleteGroupLeave = async (groupId, userId) => {
  try {  
    const result = await pool.query("DELETE FROM group_members WHERE groups_idgroup = $1 AND accounts_idaccount = $2 RETURNING *", [groupId, userId]);
    //also remove -1 from member count
    await pool.query("UPDATE groups SET member_count = member_count - 1 WHERE idgroup = $1",[groupId]);
    console.log('User removed from group successfully.');
  } catch (error) {
    console.error('Error removing user from group:', error);
    throw error;
  }
};

const deleteGroupDelete = async (groupId) => {
  const client = await pool.connect();  // Get a client from the pool
  try {
    // Start a transaction
    await client.query('BEGIN');

    // Delete from group_highlights
    await client.query('DELETE FROM group_highlights WHERE groups_idgroup = $1', [groupId]);

    // Delete from group_members
    await client.query('DELETE FROM group_members WHERE groups_idgroup = $1', [groupId]);

    // Delete from groups
    await client.query('DELETE FROM groups WHERE idgroup = $1', [groupId]);

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

const deleteGroupHighlight = async(highlightId) =>{

  try{
    const result = await pool.query("DELETE FROM group_highlights WHERE idgroup_highlight = $1", [highlightId])
    console.log('Highlight removed successfully.');
  }catch (error) {
    console.error('Error removing highlight:', error);
    throw error;
  }
}


const insertGroupJoin = async (groups_idgroup, accounts_idaccount) => {
  const existingMember = await pool.query("SELECT * FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2",[accounts_idaccount, groups_idgroup]);
  if (existingMember.rows.length > 0) {
    throw new Error("User already in group");
  }
  //if user is added, also add a +1 to member count
  await pool.query("UPDATE groups SET member_count = member_count + 1 WHERE idgroup = $1",[groups_idgroup]);
  return await pool.query("INSERT INTO group_members (accounts_idaccount, groups_idgroup, is_a_member) VALUES ($1, $2, $3) RETURNING *",[accounts_idaccount, groups_idgroup, 1]);
};

const insertGroupReply = async (groups_idgroup, accounts_idaccount,reply) => {
  const existingMember = await pool.query("SELECT * FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2 AND is_a_member = '1'",[accounts_idaccount, groups_idgroup]);
  if (existingMember.rows.length > 0) {
    throw new Error("User already in group or has not requested to join");
  }
  //if user is added, also add a +1 to member count
  if(reply === 1){
  await pool.query("UPDATE groups SET member_count = member_count + 1 WHERE idgroup = $1",[groups_idgroup]);
  return await pool.query("UPDATE group_members SET group_request_timestamp = NULL, is_a_member = '1', join_date_timestamp=NOW() WHERE accounts_idaccount = $1 AND groups_idgroup = $2 RETURNING *",[accounts_idaccount, groups_idgroup]);
} else if(reply === 0){
  return await pool.query("DELETE FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2 RETURNING *",[accounts_idaccount, groups_idgroup]);
} else throw new Error("error replying group request");
};


export {selectAllGroups, selectGroupById, selectGroupHighlights, selectAllGroupMembers, selectAllGroupJoinRequesters, 
  insertGroupCreate, 
  deleteGroupDelete, deleteGroupLeave, deleteGroupHighlight, insertGroupJoin, insertGroupReply};


// await pool.query(
//   "INSERT INTO groups_members (accounts_idaccount, groups_idgroup, is_a_member, join_date_timestamp) VALUES ($1, $2, 1, NOW())",
//   [userId, groupId]
// );

//   return { idgroup: groupId, group_name: name, owner: userId, member_count: 1, description };