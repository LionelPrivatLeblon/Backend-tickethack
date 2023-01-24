var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
//var userRouter = require("../models/user");

const tripsSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
  reserved: Boolean,
});

const trip = mongoose.model("trips", tripsSchema);

module.exports = trip;
