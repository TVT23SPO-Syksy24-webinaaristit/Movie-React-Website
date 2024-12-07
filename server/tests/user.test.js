import request from "supertest";
import app from "../app.js";
import { pool } from "../helpers/db.js"

describe("User authentication", () => {
    let server;
    let token;

    beforeAll(async () => {
        server = app.listen(4000, () => {
            console.log("Test server is running on http://localhost:4000");
        });

        await pool.query('DELETE FROM accounts WHERE email LIKE $1', ['rekisteritesti%']);

        await request(server)
        .post("/user/register")
        .send({ email: "kirjautumistesti2@foo.com",password: "asd213easde"});
    })

    afterAll(async () => {
        await pool.query('DELETE FROM accounts WHERE email LIKE $1', ['rekisteritesti%']);
        await pool.end();
        server.close();
    });

    describe('POST /api/auth/login', () => {
        const email = process.env.EMAIL;
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        it (("should register"), async () => {
        const response = await request(server)
            .post("/user/register")
            .send({"username":username,"email":email,"password":password});
        expect(response.status).toBe(201);
        });      
    });

    describe("POST login", () => {
        const email = "kirjautumistesti2@foo.com";
        const password = "asd213easde";
        it ("should login", async () => {
            const response = await request(server)
                .post("/user/login")
                .send({"email":email,"password":password});
            console.log(response);
             expect(response.status).toBe(200);
             expect(response.body).toHaveProperty("token");
        });
    });
});

