import request from "supertest";
import app from "../app.js";
import { pool } from "../helpers/db.js"
// test all the aspects of a group; creation, joining, leaving, deleting

//beforaAll user needs to be registered and logged in

describe('Groups API with Foreign Key Constraints', () => {
    let testOwner;
    let testFavorite;
  
    beforeAll(async () => {
      // Clear the database
      await pool.query('DELETE FROM favorites');
      await pool.query('DELETE FROM accounts');
      await pool.query('DELETE FROM groups');
  
      // Insert a test account
      const ownerResult = await pool.query(
        `INSERT INTO accounts (idaccount, username, password, email)
         VALUES (1, 'testuser', 'tpw', 'testuser@example.com')
         RETURNING *`
      );
      testOwner = ownerResult.rows[0];
  
      // Insert a favorite referencing the test account
      const favoriteResult = await pool.query(
        `INSERT INTO favorites (idmovie, poster_url, title, accounts_idaccount)
         VALUES (123, 'https://example.com/poster.jpg', 'Test Movie', $1)
         RETURNING *`,
        [testOwner.idaccount]
      );
      testFavorite = favoriteResult.rows[0];
    });
  
    afterAll(async () => {
      await pool.end();
    });
  
    it('POST /api/groups - should create a new group successfully', async () => {
        const newGroup = {
          group_name: 'Test Group',
          owner: 1, // Valid owner ID
          member_count: 5,
          group_description: 'This is a test group.',
        };
    
        const response = await request(app)
          .post('/api/groups')
          .send(newGroup);
    
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
          group_name: 'Test Group',
          owner: 1,
          member_count: 5,
          group_description: 'This is a test group.',
        });
    
        // Verify the group exists in the database
        const dbCheck = await pool.query(
          `SELECT * FROM groups WHERE group_name = $1 AND owner = $2`,
          ['Test Group', testOwner.idaccount]
        );
        expect(dbCheck.rowCount).toBe(1);
        expect(dbCheck.rows[0]).toMatchObject({
          group_name: 'Test Group',
          owner: testOwner.idaccount,
          member_count: 5,
          group_description: 'This is a test group.',
        });
      });
    });