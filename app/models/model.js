// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var User = sequelize.define("users", {
    // the username gets saved as a string
    username: Sequelize.STRING,
    // email gets saved as a string
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
            len: [1, 35]
        }
    },
    // password gets saved as a string
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 18],
            is: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", "i"]
        }
    },
    stock1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    stock2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    stock3: {
        type: Sequelize.STRING,
        allowNull: true
    },
    stock4: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    
    

});



// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;
