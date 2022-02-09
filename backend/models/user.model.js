const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    site: { type: String, required: true },
    job: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String, default: "" },
    bio: { type: String, max: 1024 },
    followers: { type: [String] },
    following: { type: [String] },
    likes: { type: [String] },
    dislikes: { type: [String] },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
