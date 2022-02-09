const User = require("../models/user.model");

const validator = require("validator");
const cryptojs = require("crypto-js");
const bcrypt = require("bcrypt");

exports.signUp = (req, res, next) => {
  const { firstname, lastname, site, job, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Invalid password" });
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
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};
