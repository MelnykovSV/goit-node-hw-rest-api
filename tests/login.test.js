/* eslint-env jest */
const request = require("supertest");
const app = require("./../app");

const mongoDB = require("./../server");

const req = { email: "pisay24077@sportrid.com", password: "Aa111111" };

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
    expect(response.body.data.user.userName).toBe("pisay24077");
    expect(response.body.data.user.email).toBe("pisay24077@sportrid.com");
    expect(response.body.data.user.subscription).toBe("starter");
    expect(response.body.data.user.avatarURL).toBe(
      "//www.gravatar.com/avatar/5f5eb4cafee5feeeb95be5f550fcc7c5"
    );
    expect(Object.keys(response.body.data.user).length).toBe(4);
  });
});
