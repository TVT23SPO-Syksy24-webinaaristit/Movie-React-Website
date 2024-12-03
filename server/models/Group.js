//server/models/Group.js
import {pool} from "../helpers/db.js";
//Group.js imports connection to database from helper db.js and includes queries related to groups

const selectAllGroups = async () => {
  const result = await pool.query("SELECT idgroup, group_name, member_count, description FROM groups");
  // Make sure the returned values are usable.
  return result.rows.map(row => ({
      id: row.idgroup,
      name: row.group_name,
      members: row.member_count,
      description: row.description
  }));
};

const selectGroupById = async (id) => {
    return await pool.query("SELECT * FROM groups WHERE idgroup = $1",[id]);
};

const insertGroupCreate = async (groupData) => {
    const {name, description, owner} = groupData;
    return await pool.query("INSERT INTO groups (name, description, owner) VALUES ($1, $2, $3) RETURNING *",[name, description, owner]);
};

const insertGroupJoin = async (groupId, userId) => {
  const existingMember = await pool.query("SELECT * FROM group_members WHERE accounts_idaccount = $1 AND groups_idgroup = $2",[userId, groupId]);
  if (existingMember.rows.length > 0) {
    throw new Error("User already in group");
  }
  return await pool.query("INSERT INTO group_members (accounts_idaccount, groups_idgroup) VALUES ($1, $2) RETURNING *",[userId, groupId]);

};

export {selectAllGroups, selectGroupById, insertGroupCreate, insertGroupJoin};