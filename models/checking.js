var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
//var userRouter = require("../models/user");

const checkingSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
  reserved: Boolean,
});

const checking = mongoose.model("checkings", checkingSchema);

module.exports = checking;
