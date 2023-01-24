var express = require("express");
var router = express.Router();

//const fetch = require("node-fetch");
const Trip = require("../models/trips.js");

router.get("/", (req, res) => {
  Trip.find().then((data) => {
    console.log(data);
    let dates = data.map((e) => e.date);

    //const moment = require("moment");

    dates = moment(new Date("2019/06/01 14:04:03"));

    dates.format("h:mma");
    //let momentDate = moment(dates, "YYYY-MM-DD HH:mm");
    // momentObject(2018-02-06T13:35:00+01:00)

    res.json({ trip: dates });
  });
});

router.get("/departure/:departure", (req, res) => {
  Trip.findOne({
    departure: { $regex: new RegExp(req.params.departure, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, trip: data });
    } else {
      res.json({ result: false, error: "departure not found" });
    }
  });
});

router.get("/arrival/:arrival", (req, res) => {
  Trip.findOne({
    arrival: { $regex: new RegExp(req.params.arrival, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, trip: data });
    } else {
      res.json({ result: false, error: "arrival not found" });
    }
  });
});

router.get("/:departure/:arrival/:date", (req, res) => {
  let searchDate = moment(req.params.date, "YYYYMMDD").toISOString();
  let start = moment(searchDate).startOf("day").toISOString();
  let end = moment(searchDate).endOf("day").toISOString();

  Trip.find({
    departure: { $regex: new RegExp(req.params.departure, "i") },
    arrival: { $regex: new RegExp(req.params.arrival, "i") },
    date: { $gte: start, $lt: end },
  }).then((data) => {
    if (data.length > 0) {
      res.json({ result: true, trips: data });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

router.post("/trips", (req, res) => {
  if (!req.body.departure) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  Trip.findOne({ departure: req.body.departure }).then((data) => {
    if (data === null) {
      res.json({ result: false, error: "Result found" });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

module.exports = router;
