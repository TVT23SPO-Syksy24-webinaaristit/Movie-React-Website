import request from "supertest";
import app from "../app.js";
import { pool } from "../helpers/db.js";
import { hash } from "bcrypt";

describe("User authentication", () => {
  let server;
  let token;

  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Test server is running on http://localhost:4000");
    });
    const password = await hash("testitesti", 10);
    await pool.query(
      "INSERT INTO accounts (username, email, password) VALUES($1,$2,$3)",
      ["testi15", "testi15@gmail.com", password]
    );

    await request(server)
      .post("/user/register")
      .send({ email: "kirjautumistesti2@foo.com", password: "asd213easde" })
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
      console.log(response);
        expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid password for user");
    });
  });

  describe("Login", () => {
    it("should login", async () => {
      const response = await request(server)
        .post("/user/login")
        .send({ email: "testi15@gmail.com", password: "testitesti" });
      console.log(response);
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
        console.log(response);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid Credentials");
      });

    it("should not login with wrong email", async () => {
    const response = await request(server)
        .post("/user/login")
        .send({ email: "testi15WRONG@gmail.com", password: "testitesti" });
    console.log(response);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Credentials");
    });
    
    });
});
