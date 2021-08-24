const express = require("express");
const router = express.Router();

//@route    Get api/users
//@desc     Test Route
//@acces    Public / Private
router.get("/", (req, res) => res.send("Profile Route"));

module.exports = router;
