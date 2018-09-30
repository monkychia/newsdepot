const mongoose = require("mongoose");

// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdepot";
mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = {
  Article: require("./Article"),
  Note: require("./Note")
};

