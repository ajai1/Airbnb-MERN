// json web tokens ----------------------------------------------------
const jwt = require("jsonwebtoken");
const Room = require("../models/room");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, "airbnbsecretstring");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

module.exports = auth;
