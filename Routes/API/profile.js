const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@route    Get api/profile/me
//@desc     Test Route
//@acces    Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate([
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//@route    Post api/profile/
//@desc     Create  or Update
//@acces    Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skill is not Empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Build social array
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instgram) profileFields.social.instagram = instagram;

    try {
        let profile = Profile.findOne({user: req.user.id});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
  }
);
module.exports = router;
