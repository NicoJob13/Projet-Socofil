const Post = require("../models/post.model");
const User = require("../models/user.model");

const ObjectId = require("mongoose").Types.ObjectId;

exports.getPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
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
      if (!post.dislikers.includes(req.body.id)) {
        Post.updateOne(
          { _id: req.params.id },
          { $addToSet: { likers: req.body.id } },
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
          { $addToSet: { likes: req.params.id } },
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
          .json({ message: "You have already disliked this post" });
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
      if (!post.likers.includes(req.body.id)) {
        Post.updateOne(
          { _id: req.params.id },
          { $addToSet: { dislikers: req.body.id } },
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
          { $addToSet: { dislikes: req.params.id } },
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
          .json({ message: "You have already liked this post" });
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

exports.commentPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.updateOne(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true, upsert: true }
  )
    .then(() => {
      res.status(200).json({ message: "New comment sucessfully added" });
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.editCommentPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.updateOne(
    {
      _id: req.params.id,
      "comments._id": req.body.commentId,
    },
    {
      $set: {
        "comments.$.text": req.body.text,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: "Comment successfully modified" });
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.deleteCommentPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id unknown ");
  }

  Post.updateOne(
    {
      _id: req.params.id,
    },
    {
      $pull: {
        comments: {
          _id: req.body.commentId,
        },
      },
    },
    { new: true, upsert: true }
  )
    .then(() => {
      res.status(200).json({ message: "Comment successfully deleted" });
      next();
    })
    .catch((err) => res.status(500).json({ error: err }));
};
