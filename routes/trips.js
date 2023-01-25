var express = require("express");
var router = express.Router();
const moment = require("moment");

//const fetch = require("node-fetch");
const Trip = require("../models/trips.js");
const Checking = require("../models/checking.js");

router.get("/", (req, res) => {
  Trip.find().then((data) => {
    //let dates = data.map((e) => e.date);

    let dates = data[0].date;
    let newDate = moment(dates).format("YYYY-MM-DD");
    let newHour = moment(dates).format("HH:mm:ss");

    //dates.slice(0, 1);
    res.json({ newDate, newHour });
  });
});

router.post("/departure/:departure", (req, res) => {
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

router.post("/arrival/:arrival", (req, res) => {
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

router.post("/departure", (req, res) => {
  console.log(req.body);
  if (!req.body.departure && !req.body.arrival && !req.body.selectDate) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  Trip.findOne({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    selectDate: req.body.selectDate,
  }).then((data) => {
    if (data === null) {
      res.json({ result: false, error: "Pas de ville trouvée" });
    } else {
      let dates = data.date;
      let newDate = moment(dates).format("YYYY/MM/DD");
      let newHour = moment(dates).format("HH:mm");
      res.json({ result: true, trips: data, newDate, newHour });
    }
  });
});

module.exports = router;
