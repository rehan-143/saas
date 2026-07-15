const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const createApp = require("../app");
const Inquiry = require("../models/Inquiry");

let mongoServer;
let app;

const validPayload = {
  fullName: "Jane Doe",
  companyName: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555-123-4567",
  country: "United States",
  industry: "Software / SaaS",
  companySize: "11-50",
  message: "We are evaluating CRMs for our 20-person sales team.",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createApp();
});

afterEach(async () => {
  await Inquiry.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /api/inquiry", () => {
  it("creates a new inquiry with valid data", async () => {
    const res = await request(app).post("/api/inquiry").send(validPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(validPayload.email);
  });

  it("rejects an inquiry with an invalid email", async () => {
    const res = await request(app)
      .post("/api/inquiry")
      .send({ ...validPayload, email: "not-an-email" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects an inquiry missing required fields", async () => {
    const res = await request(app).post("/api/inquiry").send({ fullName: "Jane Doe" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("GET /api/inquiry", () => {
  it("returns all inquiries", async () => {
    await Inquiry.create(validPayload);
    await Inquiry.create({ ...validPayload, email: "second@acme.com" });

    const res = await request(app).get("/api/inquiry");

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.data).toHaveLength(2);
  });
});

describe("DELETE /api/inquiry/:id", () => {
  it("deletes an existing inquiry", async () => {
    const inquiry = await Inquiry.create(validPayload);

    const res = await request(app).delete(`/api/inquiry/${inquiry._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const remaining = await Inquiry.find();
    expect(remaining).toHaveLength(0);
  });

  it("returns 404 for a non-existent id", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/inquiry/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

  it("returns 400 for a malformed id", async () => {
    const res = await request(app).delete("/api/inquiry/not-a-valid-id");

    expect(res.statusCode).toBe(400);
  });
});
