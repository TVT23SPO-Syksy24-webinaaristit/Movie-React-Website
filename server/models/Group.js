//server/models/Group.js
import {pool} from "../helpers/db.js";
//Group.js imports connection to database from helper db.js and includes queries related to groups

const selectAllGroups = async () => {
  const result = await pool.query("SELECT idgroup, group_name, member_count, group_description FROM groups");
  // Make sure the returned values are usable.
  return result.rows.map(row => ({
      id: row.idgroup,
      name: row.group_name,
      members: row.member_count,
      description: row.group_description
  }));
};

const selectGroupById = async (id) => {
    return await pool.query("SELECT * FROM groups WHERE idgroup = $1",[id]);
};

const insertGroupCreate = async (groupData) => {
    const {owner,name, description} = groupData;
    try{
    return await pool.query("INSERT INTO groups (group_name, group_description, owner, member_count) VALUES ($1, $2, $3, 1) RETURNING *",
      [name, description, owner]
    );

    const groupId = result.rows[0].idgroup; // Get the group ID from the result

    await pool.query(
      "INSERT INTO groups_members (accounts_idaccount, groups_idgroup, is_a_member, join_date_timestamp) VALUES ($1, $2, 1, NOW())",
      [userId, groupId]
    );

      return { idgroup: groupId, group_name: name, owner: userId, member_count: 1, description };
    } catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
};

const insertGroupJoin = async (groupId, userId) => {
  const existingMember = await pool.query("SELECT * FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2",[userId, groupId]);
  if (existingMember.rows.length > 0) {
    throw new Error("User already in group");
  }
  return await pool.query("INSERT INTO group_members (accounts_idaccount, groups_idgroup, is_a_member) VALUES ($1, $2, $3) RETURNING *",[userId, groupId, 1]);

};

export {selectAllGroups, selectGroupById, insertGroupCreate, insertGroupJoin};