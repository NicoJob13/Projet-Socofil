const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkAuth, requireAuth } = require("./middleware/auth.middlewares");

require("./config/db");

const app = express();

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("*", checkAuth);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
