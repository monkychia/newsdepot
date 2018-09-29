const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

console.log('---------- 28 ',app);

app.get("/blah", function(req, res) {
  res.render("index", { title: "blah"});
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
