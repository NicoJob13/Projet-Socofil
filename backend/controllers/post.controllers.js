const Post = require("../models/post.model");
const User = require("../models/user.model");

const ObjectId = require("mongoose").Types.ObjectId;

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
      next();
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.createPost = (req, res, next) => {
  const { posterId, message } = req.body;

  const post = new Post({ posterId, message });

  post
    .save()
    .then(() => {
      res.status(201).json({ message: "New post created" });
      next();
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.modifyPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown : " + req.params.id);
  }
  Post.findOne({ _id: req.params.id })
    .then(() => {
      Post.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      )
        .then(() => {
          res.status(200).json({ message: "Post modified" });
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(404).json({ error: err }));
};

exports.deletePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown : " + req.params.id);
  }
  Post.findOne({ _id: req.params.id })
    .then(() => {
      Post.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "Post deleted" });
          next();
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(404).json({ error: err }));
};
