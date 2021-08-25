const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// //@route    Get api/users
// //@desc     Test Route
// //@acces    Public / Private
// router.get('/',(req,res)=>res.send("user Route"));

//@route    Get api/users
//@desc     Register Route
//@acces    Public / Private
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email " ).isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or more Character").isLength({ min: 6 })
    ,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User Route");
  }
);

module.exports = router;
