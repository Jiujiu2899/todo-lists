require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


const connectDB = require("./Config/db");
const { readdirSync } = require("fs");


const app = express();
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

readdirSync("./Routes").map((route) => {
  app.use("/api", require("./Routes/" + route));
});


const port = process.env.PORT || 10000; 
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

console.log(port)
