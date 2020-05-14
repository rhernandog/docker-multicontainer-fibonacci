const keys = require("./keys");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to postgress
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("error", () => console.log("Lost PG Database connection."));

// Create the table for the values if it doesn't exists
pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.log("Cannot create the values table", err));

// Redis Setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

/* Routing */
app.get("/", (req, res) => {
  res.status(200).send("Root route of the Fibonacci API");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");
  res.status(200).send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.status(200).send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    res.status(400).send("The index value passed is too high.");
  }
  redisClient.hset("values", index, "Not calculated yet");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index])
    .then(res => {
      console.log("=====\nPG insert values response");
      console.log(res);
    })
    .catch(err => console.error("*****\nPG insert values ERROR", err));
  res.status(200).json({ working: true });
});

app.listen(5000, () => console.log("Express server listenning on PORT: 5000"));
