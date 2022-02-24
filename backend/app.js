const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const { checkAuth, requireAuth } = require("./middleware/auth.middlewares");

require("./config/db");
require("dotenv").config({ path: "./config/.env" });

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(helmet());

const limiter = rateLimit({
  windowMS: 5 * 60 * 1000,
  max: 50,
  message: "Too many requests made with this IP address",
});

app.use(limiter);

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
