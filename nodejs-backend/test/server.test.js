const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

describe("Items API", () => {
  it("should GET all the items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should POST a new item", async () => {
    const newItem = { name: "Test Item" };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Test Item");
  });

  it("should return 404 for an invalid route", async () => {
    const res = await request(app).get("/invalid-route");
    expect(res.statusCode).toEqual(404);
  });
});
