const db = require("../models");
const scrape = require("../scripts/scrape");
const env = process.env.NODE_ENV || "development";
// const axios = require("axios");
// const cheerio = require("cheerio");

module.exports = function (app) {

  // Get all articles from echoJS website
  app.get("/scrape", function(req, res) {
    scrape(function(data) {
      // let articlesArray = data;
        // Create a new Article using the `data` object built from scraping
        db.Article.create(data)
          .then(function(dbArticle) {
            // View the added data in the console
            console.log(dbArticle);
            res.render('index', { title: "Express" });
            // res.render('index', {entries: dbArticle});
          });
      });
  });

  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.delete("/articles", function(req, res) {
    db.Article.deleteMany({})
      .then(function(data) {

        console.log('-------------- 71 ', data);

        res.json(data);
      })
  })

};
