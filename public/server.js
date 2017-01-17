// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Promise = require("bluebird");

mongoose.Promise = Promise;

// Establish a connection to the collection; bring in the module
var Articles = require("./articlesModel.js");

// Initialize Express
var app = express();

// Configure the app to use body parser and morgan
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Static file support with public folder
app.use(express.static("public"));

// Hook mongoose with the mongodb database
// Our database: nytreact
mongoose.connect("mongodb://localhost/nytreact");

// Save mongoose connection to db
var db = mongoose.connection;

// If there's a mongoose error, log it to console
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes

// Simple index route
app.get("/", function(req, res) {
  res.send(index.html);
});

// We handle posts to our mongodb database here
app.post("/submit", function(req, res) {

  // Inserting an array and a boolean into the req.body object for example purposes
  req.body.array = ["item1", "item2", "item3"];
  // Remember, we have to specify booleans on the server--the front-end can only send strings
  req.body.boolean = false;

  // We use the "Example" class we defined above
  // to check our req.body against our Example model
  var content = new Example(req.body);

  // With the new Example object created, we can save our data to mongoose
  // Notice the different syntax. The magic happens in exampleModel.js
  content.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise, send the new doc to the browser
    else {
      res.send(doc);
    }
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});