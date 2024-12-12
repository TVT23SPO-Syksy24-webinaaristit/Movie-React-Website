import request from "supertest";
import app from "../app.js";
import { pool } from "../helpers/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const { sign } = jwt;

dotenv.config();

// Generate a test token
const testUserId = 50;

beforeAll(async () => {
  // Insert a test user into the database
  await pool.query(`
    INSERT INTO accounts (idaccount, username, password, email)
    VALUES ($1, 'testuser', 'hashedpassword', 'testuser@example.com')
  `, [testUserId]);
  console.log("Test user inserted into the database");
});

afterAll(async () => {
  // Clean up: Remove the associated data 1) and then delete the user 2)
  await pool.query("DELETE FROM group_members WHERE accounts_idaccount = $1", [testUserId]);
  await pool.query("DELETE FROM groups WHERE owner = $1", [testUserId]);
  await pool.query("DELETE FROM accounts WHERE idaccount = $1", [testUserId]);
  await pool.end(); // Close the database connection pool
  console.log("Test user removed from the database");
});

const generateTestToken = (email) => {
  return sign({user: email}, process.env.JWT_SECRET_KEY);
};

describe("Group creation", () => {
  it("should create a new group successfully", async () => {
    const token = generateTestToken(testUserId); // Use user ID 1 for testing

    const requestBody = {
      owner: testUserId,
      name: "Test Group",
      description: "A group for testing",
    };

    const response = await request(app)
      .post("/groups/create")
      .set("Authorization", token) // Add the token to the request
      .send(requestBody)
      .expect(201);

    expect(response.body).toMatchObject({
      group_name: "Test Group",
      owner: testUserId,
      description: "A group for testing",
      member_count: 1,
      });
  
      // Validate the database state
      const result = await pool.query("SELECT * FROM groups WHERE group_name = $1", ["Test Group"]);
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].group_name).toBe("Test Group");
      console.log("Group created successfully");
    });

    it("should fail at creation miserably", async () => {
      const token = generateTestToken(testUserId); // Use user ID 1 for testing

      const requestBody = {
        owner: '66666',
        name: "Test Group",
        description: "A group for testing",
      };

      const response = await request(app)
        .post("/groups/create")
        .set("Authorization", token) // Add the token to the request
        .send(requestBody)
        .expect(500);
        console.log("Group creation failed for invalid user");
    });
  });