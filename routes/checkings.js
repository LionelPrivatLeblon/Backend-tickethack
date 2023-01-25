var express = require("express");
var router = express.Router();

//const fetch = require("node-fetch");
const checking = require("../models/checking.js");

router.get("/", (req, res) => {
  checking.find().then((data) => {
    res.json({ checking: data });
  });
});

router.get("/checkings/:_id", (req, res) => {
  console.log("test");
  /*if (!req.body.departure && !req.body.arrival && !req.body.selectDate) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  checking
    .findOne({
      departure: { $regex: new RegExp(req.body.departure, "i") },
      arrival: { $regex: new RegExp(req.body.arrival, "i") },
      selectDate: req.body.selectDate,
    })
    .then((data) => {
      if (data === null) {
        res.json({ result: false, error: "Pas de ville trouvée" });
      } else {
        let dates = data.date;
        let newDate = moment(dates).format("YYYY/MM/DD");
        let newHour = moment(dates).format("HH:mm");
        res.json({ result: true, trips: data, newDate, newHour });

        const newChecking = new Checking({
          departure: req.body.departure,
          arrival: req.body.arrival,
          hour: newHour,
          date: newDate,
          price: req.body.price,
        });

        // Finally save in database
        newChecking.save().then((data, newDate, newHour) => {
          res.json({ result: true, trips: data, newDate, newHour });
        });
      }
    });
    */
});

router.post("/checkings", (req, res) => {
  /*if (!checkBody(req.body, ["email", "password"])) {
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
  );*/
});

module.exports = router;
