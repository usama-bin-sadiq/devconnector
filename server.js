const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();
app.get("/", (req, res) => res.send("Api is Running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));
