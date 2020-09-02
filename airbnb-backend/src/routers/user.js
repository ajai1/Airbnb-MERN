const express = require("express");
const router = new express.Router();
//middleware -----------------------------------------------------------------------
const auth = require("../middleware/auth");

//imports of other packages --------------------------------------------------------
const bcrypt = require("bcryptjs");

//Model --------------------------------------------------------------------------
const User = require("../models/user");

//create Users
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login Users
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findOne({ "tokens.token": req.token });
    res.status(201).send({ user });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//login Users
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//logout Users
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
