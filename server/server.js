require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


const connectDB = require("./Config/db");
const { readdirSync } = require("fs");

const port = 5000;
const app = express();
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

readdirSync("./Routes").map((route) => {
  app.use("/api", require("./Routes/" + route));
});

app.listen(port, () => console.log("server run on port " + port));
