import request from "supertest";
import app from "../app.js";
import { pool } from "../helpers/db.js";
import { hash } from "bcrypt";
import { deleteTestUser, insertTestUser , getToken, insertTestReview} from "../helpers/testhelper.js";
import { selectUserByEmail } from "../models/User.js";
import { insertFavorites } from "../models/FavoriteList.js";
import { insertGroupCreate } from "../models/Group.js";
import { insertHighlightCreate } from "../models/Group.js";

describe("User tests", () => {
  let server;
  let reviewText = "reviewtesting";
  let movieId = 550;

  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Test server is running on http://localhost:4000");
    });

    //delete all testusers
    await deleteTestUser("testi15@gmail.com");
    await deleteTestUser("testi50@gmail.com");
    await deleteTestUser("okdeletetest@gmail.com");
    await deleteTestUser("unauthdeletetest@gmail.com");
    await deleteTestUser("nulldeletetest@gmail.com");
    
    //create login testuser
    await insertTestUser("testi15","testi15@gmail.com","testitesti"); 
    
    //create delete testusers
    await insertTestUser("testi","okdeletetest@gmail.com","testitesti");
    await insertTestUser("testi","unauthdeletetest@gmail.com","testitesti");
    await insertTestUser("testi","nulldeletetest@gmail.com","testitesti");
  });

  afterAll(async () => {
    const response = await pool.query(
      "SELECT * FROM accounts WHERE email = $1",
      ["testi15@gmail.com"]
    );
    const userId = response.rows[0].idaccount;
    await pool.query("CALL delete_account($1)", [userId]);
    const response2 = await pool.query(
      "SELECT * FROM accounts WHERE email = $1",
      ["testi50@gmail.com"]
    );
    const userId2 = response2.rows[0].idaccount;
    await pool.query("CALL delete_account($1)", [userId2]);
    await pool.end();
    server.close();
  });

  describe("Register", () => {
    const email = "testi50@gmail.com";
    const username = "testi50";
    const password = "testitesti";
    const shortpassword ="123";

    it("should register", async () => {
      const response = await request(server)
        .post("/user/register")
        .send({ username: username, email: email, password: password });
      expect(response.status).toBe(201);
      expect(response.body.username).toBe("testi50");
      expect(response.body.email).toBe("testi50@gmail.com");
    });

    it("should not register with empty email", async () => {
      const response = await request(server)
        .post("/user/register")
        .send({ username: username, email: "", password: password });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid email for user");
    });

    it("should not register with password shorter than 8 characters", async () => {
      const response = await request(server)
        .post("/user/register")
        .send({ username: username, email: email, password: shortpassword });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid password for user");
    });
  });

  describe("Login", () => {

    it("should login", async () => {
      const response = await request(server)
        .post("/user/login")
        .send({ email: "testi15@gmail.com", password: "testitesti" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("email");
    });

    it("should not login with wrong password", async () => {
        const response = await request(server)
          .post("/user/login")
          .send({ email: "testi15@gmail.com", password: "testitestiWRONG" });
          
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid Credentials");
      });

    it("should not login with wrong email", async () => {
      const response = await request(server)
          .post("/user/login")
          .send({ email: "testi15WRONG@gmail.com", password: "testitesti" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid Credentials");
    });
  });

  describe("User deletion", () => {
    const token = getToken("reviewtest@gmail.com");

    it("should delete all user data when authorized", async () => {
      const idresponse = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        ["okdeletetest@gmail.com"]
      );
      const userId = idresponse.rows[0].idaccount;

      //insert review to test data deletion
      await insertTestReview("okdeletetest@gmail.com", movieId, reviewText, 1);

      //insert favourite to test data deletion
      await insertFavorites(movieId, "testmovie", userId, "testurl");

      //insert group to test data deletion
      const groupName = 'testgroup';
      const groupDesc = 'testdesc';
      const groupInfo = await insertGroupCreate({owner: userId, name: groupName, description: groupDesc});
      const groupId = groupInfo.idgroup;

      //insert group_highlights to test data deletion
      await insertHighlightCreate(groupId, userId, 'testurl', 'testhl', 550, 'testdesc', 'testsrc');

      const response = await request(server)
          .get(`/user/delete/${userId}`)
          .set("authorization", token)

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", userId);
      
    
      //check that review is deleted
      const testReviewsResult = await pool.query('SELECT * FROM reviews WHERE review_text = $1', [reviewText]);
      expect(testReviewsResult.rows.length).toBe(0);

      //check that favourite is deleted
      const favoritesResult = await pool.query('SELECT * FROM favorites WHERE accounts_idaccount = $1', [userId]);
      expect(favoritesResult.rows.length).toBe(0);

      //check that group is deleted
      const groupsResult = await pool.query('SELECT * FROM groups WHERE owner = $1', [userId]);
      expect(groupsResult.rows.length).toBe(0);

      //check that group_highlights is deleted
      const groupHLResult = await pool.query('SELECT * FROM group_highlights WHERE accounts_idaccount = $1', [userId]);
      expect(groupHLResult.rows.length).toBe(0);
    });

    it("should not delete data when unauthorized", async () => {
      const idresponse = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        ["unauthdeletetest@gmail.com"]
      );
    const userId = idresponse.rows[0].idaccount;
      const response = await request(server)
        .get(`/user/delete/${userId}`)
      
      const responseBody = JSON.parse(response.text);

      expect(response.status).toBe(401);
      expect(responseBody.message).toBe("Authorization required");
    });

    it("should not delete data when userId is null", async () => {
      const nullId = null;
      const response = await request(server)
          .get(`/user/delete/${nullId}`)
          .set("authorization", token)

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("User id not found");
    });
  })
});
