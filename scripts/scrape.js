// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");

//scrape articles from the New YorK Times
const scrape = function(callback) {

  const articlesArr = [];

  request("http://www.echojs.com/", function(error, response, html) {

      const $ = cheerio.load(html);

      $("article h2").each(function(i, element) {

          let result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });

      callback(articlesArr);
  });

};

module.exports = scrape;
