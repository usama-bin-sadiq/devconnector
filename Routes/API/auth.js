const express = require("express");
const router = express.Router();

//@route    Get api/auth
//@desc     Test Route
//@acces    Public / Private
router.get("/", (req, res) => res.send("Auth Route"));

module.exports = router;
