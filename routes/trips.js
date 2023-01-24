var express = require("express");
var router = express.Router();

//const fetch = require("node-fetch");
const User = require("../models/users.js");
const { checkBody } = require("../modules/checkbody.js");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ email: req.body.email, password: req.body.password }).then(
    (data) => {
      if (data) {
        res.json({ result: true, error: "User existing" });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});

module.exports = router;
