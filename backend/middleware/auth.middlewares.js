const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

require("dotenv").config({ path: "../config/.env" });

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.status(400).json({ error: err });
      } else {
        User.findById(decodedToken.userId)
          .then((user) => {
            res.locals.user = user;
            next();
          })
          .catch((err) => res.status(400).json({ error: err }));
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json("Authentication error : no token found");
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    res.status(400).json("Authentication error : no token found");
  }
};
