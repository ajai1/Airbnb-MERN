const express = require("express");
const router = new express.Router();
//imports of other packages
const bcrypt = require("bcryptjs");

//Model --------------------------------------------------------------------------
const User = require("../models/user");

//create Users
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login Users
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
