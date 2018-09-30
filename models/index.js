// const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
// const basename = path.basename(module.filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
// const db = {};

// Connect to the Mongo DB

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdepot";
mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = {
  Article: require("./Article"),
  Note: require("./Note")
};

