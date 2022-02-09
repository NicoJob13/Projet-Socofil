const express = require("express");

require("./config/db");

const app = express();

const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);

module.exports = app;
