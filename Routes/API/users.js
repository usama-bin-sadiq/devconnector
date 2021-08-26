const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const config = require("config");
// //@route    Get api/users
// //@desc     Test Route
// //@acces    Public 
// router.get('/',(req,res)=>res.send("user Route"));

//@route    Get api/users
//@desc     Register Route
//@acces    Public / Private
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email ").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or more Character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if User Exist
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User Already Existed" }] });
      }
      // Set User Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //Encrpt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JasonWebTokken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, config.get("jwtSecret"),{expiresIn:36000},
      (error, token) =>{
        if(error) throw error;
        else res.json({token});
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
