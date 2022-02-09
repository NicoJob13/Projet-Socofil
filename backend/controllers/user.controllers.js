const User = require("../models/user.model");

const ObjectId = require("mongoose").Types.ObjectId;

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) => {
      res.status(200).json(users);
      next();
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.getOneUser = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown : " + req.params.id);
  }
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      res.status(200).json(user);
      next();
    })
    .catch((err) => res.status(404).json({ error: err }));
};

exports.updateUser = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown : " + req.params.id);
  }
  User.findOne({ _id: req.params.id })
    .then(() => {
      User.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      )
        .then(() => {
          res.status(200).json({ message: "User modified" });
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(404).json({ error: err }));
};

exports.deleteUser = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown : " + req.params.id);
  }
  User.findOne({ _id: req.params.id })
    .then(() => {
      User.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "User deleted" });
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};
