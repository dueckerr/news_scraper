const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models')

// Port
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Make public a static folder
app.use(express.static("public"));

//  handlebars
var exphbs = require("express-handlebars");

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

// Connect to the Mongo DB
const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb://localhost/outside_scrape";
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });



app.get("/", function (req, res) {
    db.Article.find({ "saved": false }, function (error, data) {
        var hbsObject = {
            article: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

  
// get route to scrape from https://www.outsideonline.com/
app.get('/scrape', function(req, res) {
    axios.get('https://www.outsideonline.com/').then(function(response) {
        var $ = cheerio.load(response.data);

        $('.latest__article').each(function(i, element) {
            let title = $(this).find('h2').text();
            let summary = $(this).find('p').text();
            let link = $(this).find('a').attr('href');
            
            let article = {
                title, 
                summary,
                link: 'https://www.outsideonline.com' + link
            }
            console.log(article)

            // send to db
            db.Article.create(article)
            .then(function(dbArticle) {
                console.log(dbArticle)
            })
        });

        // confirm scrape html
        res.send('Scrape Complete')
    })
});

app.get('/articles', function (req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
})
app.get('/saved', function (req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
})
app.get('/article/:id', function(req, res) {
    db.Article.findOne({_id: req.params.id})
        .populate('note')
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

