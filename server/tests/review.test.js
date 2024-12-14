import request from "supertest";
import app from "../app.js";
import { pool } from "../helpers/db.js";
import { insertTestUser, insertTestReview, deleteTestUser, getToken } from "../helpers/testhelper.js";

describe("Reviews", () => {
    let server;
    let movieid = 550;
    let reviewText = "reviewtesting";
  
    beforeAll(async () => {
      server = app.listen(4001, () => {
        console.log("Test server is running on http://localhost:4001");
        });
        await insertTestUser("reviewtest", "reviewtest@gmail.com", "reviewreview");
        await insertTestReview("reviewtest@gmail.com", movieid, reviewText, 1);
    });
  
    afterAll(async () => {
        deleteTestUser("reviewtest@gmail.com");
        server.close();
    });

    describe("Browsing reviews", () => {
        it("should get all reviews with correct movieId", async () => {
            const response = await request(server)
                .get("/reviews/")
                .set("movieid", movieid);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        const testReview = response.body.find(
            (review) => review.reviewText === reviewText
        );
        expect(testReview).toBeDefined();
        expect(testReview).toHaveProperty("reviewText", reviewText);
        });

        it("should not get reviews with wrong movieId", async () => {
            let wrongmovieid = 1;
            const response = await request(server)
                .get("/reviews/")
                .set("movieid", wrongmovieid);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        const testReview = response.body.find(
            (review) => review.reviewText === reviewText
        );
        expect(testReview).toBeUndefined();
        });
    });

    describe("Submitting reviews", () => {
        const token = getToken("reviewtest@gmail.com");

        it("should submit review when authorized", async () => {
            const idresponse = await pool.query(
                "SELECT * FROM accounts WHERE email = $1",
                ["reviewtest@gmail.com"]
              );
            const userId = idresponse.rows[0].idaccount;

            const json = {
                "movieid": 550,
                "reviewpoints": 1,
                "reviewtext": "submit test",
                "userid": userId,
            };

            const response = await request(server)
                .post("/reviews/add")
                .set("authorization", token)
                .send(json)
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("reviewText", "submit test");
            expect(response.body).toHaveProperty("reviewPoints", 1);
            expect(response.body).toHaveProperty("timestamp");
            expect(response.body).toHaveProperty("author", "reviewtest");
        });

        it("should not submit review when unauthorized", async () => {
            const idresponse = await pool.query(
                "SELECT * FROM accounts WHERE email = $1",
                ["reviewtest@gmail.com"]
              );
            const userId = idresponse.rows[0].idaccount;

            const json = {
                "movieid": 550,
                "reviewpoints": 1,
                "reviewtext": "submit test",
                "userid": userId,
            };

            const response = await request(server)
                .post("/reviews/add")
                .send(json)
            
            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Authorization required");
        });

        it("should not submit review when starrating is not selected", async () => {
            const token = getToken("reviewtest@gmail.com");
            const idresponse = await pool.query(
                "SELECT * FROM accounts WHERE email = $1",
                ["reviewtest@gmail.com"]
              );
            const userId = idresponse.rows[0].idaccount;

            const json = {
                "movieid": 550,
                "reviewpoints": null,
                "reviewtext": "submit test",
                "userid": userId,
            };

            const response = await request(server)
                .post("/reviews/add")
                .set("authorization", token)
                .send(json)
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Star rating for review required");
        });
    });
});
  