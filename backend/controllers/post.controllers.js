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

exports.likePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (
        !post.likers.includes(req.body.id) &&
        !post.dislikers.includes(req.body.id)
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $push: { likers: req.body.id } },
          { new: true, upsert: true }
        )
          .then(() => {
            res.status(200).json({ message: "New like sucessfully added !" });
            console.log("New liker sucessfully added !");
            next();
          })
          .catch((err) => res.status(500).json({ error: err }));

        User.updateOne(
          { _id: req.body.id },
          { $push: { likes: req.params.id } },
          { new: true, upsert: true }
        )
          .then(() => {
            //res.status(200).json({ message: "New like sucessfully added !" });
            console.log("New like sucessfully added !");
            next();
          })
          .catch((err) => res.status(500).json({ error: err }));
      } else {
        return res
          .status(400)
          .json({ message: "You have already liked or disliked this post" });
      }
    })
    .catch((err) => res.status(400).json({ error: err }));
};

exports.stopLikePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.updateOne(
    { _id: req.params.id },
    { $pull: { likers: req.body.id } },
    { new: true, upsert: true }
  )
    .then(() => {
      res.status(200).json({ message: "Like sucessfully removed !" });
      console.log("Liker sucessfully removed !");
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));

  User.updateOne(
    { _id: req.body.id },
    { $pull: { likes: req.params.id } },
    { new: true, upsert: true }
  )
    .then(() => {
      //res.status(200).json({ message: "Like sucessfully removed !" });
      console.log("Like sucessfully removed !");
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.dislikePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (
        !post.likers.includes(req.body.id) &&
        !post.dislikers.includes(req.body.id)
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $push: { dislikers: req.body.id } },
          { new: true, upsert: true }
        )
          .then(() => {
            res
              .status(200)
              .json({ message: "New dislike sucessfully added !" });
            console.log("New disliker sucessfully added !");
            next();
          })
          .catch((err) => res.status(500).json({ error: err }));

        User.updateOne(
          { _id: req.body.id },
          { $push: { dislikes: req.params.id } },
          { new: true, upsert: true }
        )
          .then(() => {
            //res.status(200).json({ message: "New dislike sucessfully added !" });
            console.log("New dislike sucessfully added !");
            next();
          })
          .catch((err) => res.status(500).json({ error: err }));
      } else {
        return res
          .status(400)
          .json({ message: "You have already liked or disliked this post" });
      }
    })
    .catch((err) => res.status(400).json({ error: err }));
};

exports.stopDislikePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.updateOne(
    { _id: req.params.id },
    { $pull: { dislikers: req.body.id } },
    { new: true, upsert: true }
  )
    .then(() => {
      res.status(200).json({ message: "Dislike sucessfully removed !" });
      console.log("Disliker sucessfully removed !");
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));

  User.updateOne(
    { _id: req.body.id },
    { $pull: { dislikes: req.params.id } },
    { new: true, upsert: true }
  )
    .then(() => {
      //res.status(200).json({ message: "Dislike sucessfully removed !" });
      console.log("Dislike sucessfully removed !");
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));
};
