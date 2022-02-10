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

exports.followUser = (req, res, next) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  ) {
    return res.status(400).send("Id unknown ");
  }
  User.findOne({ _id: req.params.id })
    .then(() => {
      User.updateOne(
        { _id: req.params.id },
        { $push: { following: req.body.idToFollow } },
        { new: true, upsert: true }
      )
        .then(() => {
          res
            .status(200)
            .json({ message: "New following sucessfully added !" });
          console.log("New following sucessfully added !");
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
      User.updateOne(
        { _id: req.body.idToFollow },
        { $push: { followers: req.params.id } },
        { new: true, upsert: true }
      )
        .then(() => {
          //res.status(200).json({ message: "New follower sucessfully added !" });
          console.log("New follower sucessfully added !");
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(404).json({ error: err }));
};

exports.unfollowUser = (req, res, next) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).send("Id unknown ");
  }
  User.findOne({ _id: req.params.id })
    .then(() => {
      User.updateOne(
        { _id: req.params.id },
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true }
      )
        .then(() => {
          res.status(200).json({ message: "Following sucessfully deleted !" });
          console.log("Following sucessfully deleted !");
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
      User.updateOne(
        { _id: req.body.idToUnfollow },
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true }
      )
        .then(() => {
          //res.status(200).json({ message: "Follower sucessfully deleted !" });
          console.log("Follower sucessfully deleted !");
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(404).json({ error: err }));
};
