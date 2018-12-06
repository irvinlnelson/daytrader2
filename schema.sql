DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  email varchar(35) NOT NULL,
  password varchar(30) NOT NULL,
  stock1 varchar(255),
  stock2 varchar(255),
  stock3 varchar(255),
  stock4 varchar(255),
  createdAt DATE,
  updatedAt DATE,
  PRIMARY KEY (id)
);

INSERT INTO users (username, email, pssword, stock1, stock2, stock3, stock4)
VALUES ("irvin", "irvin@gmail.com", "Irvin1!", "IBM", "FB", "AAPL", "AX"),  ("nate", "nate@gmail.com", "Nate1!", "FB", "AAPL", "IBM", "BOA"),  ("kevin", "kevin@gmail.com", "Kevin1!", "AAPL", "FB", "IBM", "FIT");
