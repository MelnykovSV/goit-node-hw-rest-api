const request = require("supertest");
const app = require("./../app");

const mongoDB = require("./../server");

const req = { email: "tinaj66645@sportrid.com", password: "Aa111111" };

describe("Test the root path", () => {
  beforeAll(() => {
    mongoDB.connect();
  });
  afterAll(() => {
    mongoDB.disconnect();
  });
  test("Should have status-code 200", async () => {
    const response = await request(app).post("/api/auth/login").send(req);
    expect(response.statusCode).toBe(200);
  });
  test("Should have status-code 200", async () => {
    const response = await request(app).post("/api/auth/login").send(req);
    expect(typeof response.body.data.token).toBe("string");
  });
  test("Should have status-code 200", async () => {
    const response = await request(app).post("/api/auth/login").send(req);
    expect(response.body.data.user.userName).toBe("tinaj66645");
    expect(response.body.data.user.email).toBe("tinaj66645@sportrid.com");
    expect(Object.keys(response.body.data.user).length).toBe(2);
  });
});
