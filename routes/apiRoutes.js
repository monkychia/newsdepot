const db = require("../models");
const scrape = require("../scripts/scrape");
const env = process.env.NODE_ENV || "development";

module.exports = function(app) {

  // Get all articles from echoJS website
  app.get("/scrape", function(req, res) {
    let result = [];
    scrape(function(data) {
        // Create a new Article using the `data` object built from scraping

      db.Article.create(data)
        .then(function(dbArticle) {
          console.log(dbArticle);

          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });

    });
  });

  app.get("/articles/saved", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({
      saved: true
    })
      .then(function(dbArticle) {

        console.log('=========== 33 from BE ',dbArticle);

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

  // Update an article to set {save: true}
  app.put("/article/:id/:toggle", function(req, res) {

    console.log('--------- 79 in toglle',req.params.toggle);

    db.Article.findByIdAndUpdate(req.params.id, { saved: req.params.toggle })
      .then(function(dbArticle) {
        console.log(dbArticle);
      //   // If we were able to successfully update an Article, send it back to the client
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
