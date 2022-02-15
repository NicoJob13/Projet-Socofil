const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, maxlength: 500 },
    picture: { type: String },
    video: { type: String },
    likers: { type: [String] },
    dislikers: { type: [String] },
    comments: {
      type: [
        {
          commenterId: String,
          text: String,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
