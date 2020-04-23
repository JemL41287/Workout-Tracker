const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require ("path");

//const Workout = require("./models/workoutModel");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds263107.mlab.com:63107/heroku_9b74f6p7", { useNewUrlParser: true });

app.use(require ("./routes/htmlRoutes"))
app.use(require ("./routes/apiRoutes"))



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


