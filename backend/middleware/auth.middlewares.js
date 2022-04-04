const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

require("dotenv").config({ path: "../config/.env" });

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        res.status(400).json("Authentication error : invalid token");
      } else {
        User.findById(decodedToken.userId)
          .then((user) => {
            res.locals.user = user;
            next();
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      }
    });
  } else {
    console.log("Authentication error : No token found");
    res.locals.user = null;
    res.status(400).json("Authentication error : No token found");
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(400).json("Authentication error : invalid token");
      } else {
        console.log(decodedToken.userId + " is logged");
        next();
      }
    });
  } else {
    console.log("Authentication error : No token found");
    res.status(400).json("Authentication error : No token found");
  }
};
