const User = require("../models/user.model");

const validator = require("validator");
const cryptojs = require("crypto-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const { firstname, lastname, site, job, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(200).json({ error: "Invalid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(200).json({ error: "Invalid password" });
  }

  const encodedEmail = cryptojs.enc.Base64.stringify(
    cryptojs.enc.Utf8.parse(email)
  );
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        firstname,
        lastname,
        site,
        job,
        email: encodedEmail,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "New user registered" });
          next();
        })
        .catch((err) => {
          if (err.errors.email.message.includes("unique")) {
            return res
              .status(200)
              .json({ error: "This email is already in use" });
          }
          return res.status(400).json({ error: err });
        });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  const encodedEmail = cryptojs.enc.Base64.stringify(
    cryptojs.enc.Utf8.parse(email)
  );

  User.findOne({ email: encodedEmail })
    .then((user) => {
      if (!user) {
        return res.status(200).json({ error: "User not found" });
      }

      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(200).json({ error: "Incorrect password" });
          }

          const token = jwt.sign(
            { userId: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
          );

          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({ userId: user._id });
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.signOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
