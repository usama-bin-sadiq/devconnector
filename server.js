const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();
//Init Middleware
app.use(
  express.json({
    extented: false,
  })
);
app.get("/", (req, res) => res.send("Api is Running"));

//Define Routes
app.use("/api/users", require("./Routes/API/users"));
app.use("/api/auth", require("./Routes/API/auth"));
app.use("/api/profile", require("./Routes/API/profile"));
app.use("/api/post", require("./Routes/API/post"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));
