// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User = require("../models/model.js");

// Routes
// =============================================================
module.exports = function (app) {
    // Search for Specific User (or all users) then provides JSON
    app.get("/api/:users", function (req, res) {
        if (req.params.users) {
            User.findOne({
                where: {
                    username: req.params.users
                }
            }).then(function (result) {
                return res.json(result)
            });
        }
    });

    // If a user sends data to add a new user...
    app.post("/api/new", function (req, res) {
        // Take the request...
        var user = req.body;
        console.log(user);
        User.create({
            username: user.username,
            email: user.email,
            password: user.password,
            stock1: "",
            stock2: "",
            stock3: "",
            stock4: ""
        }).then(function (createdUser) {
            return res.status(201).end()
        }).catch(function (err) {
            console.log(err);
            return res.status(500).json(err)
        })
    });

    app.put("/api/:userId/:stock", function (req, res) {
        User.update(
            { stock1: req.params.stock },
            { where: { id: req.params.userId }})
            .then(function (newStock) {
                return res.status(201).json(newStock)
            }).catch(function (err) {
                console.log(err);
                return res.status(500).json(err)
            })
    })
}