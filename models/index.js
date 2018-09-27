console.log('i am in index')

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsdepot", { useNewUrlParser: true });

module.exports = {
  Article: require("./Article"),
  Note: require("./Note")
};

