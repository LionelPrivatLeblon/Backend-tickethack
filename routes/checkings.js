var express = require("express");
var router = express.Router();

//const fetch = require("node-fetch");
const checking = require("../models/checking.js");

router.get("/", (req, res) => {
  checking.find().then((data) => {
    res.json({ checking: data });
  });
});

module.exports = router;
