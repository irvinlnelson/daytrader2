// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models/model")
// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // new route loads the index.html page,
  // where users can enter new users to the db
  app.get("/new", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signUp.html"));
  });

  // all route loads the users stocks,
  // where all users in the db are displayed
  app.get("/all", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/users/:userId", function (req, res) {
    db.Users.findById(req.params.userId).then(function (user) {
      res.render("index", { user })
    }).catch(function(err){
      console.log(err)
    })
  })
}