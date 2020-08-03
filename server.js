const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

require("./routes/workout-api-routes.js")(app);
require("./routes/html-routes.js")(app);

mongoose.Promise = global.Promise;

mongoose.connect (
  process.env.MONGODB_URI || "mongodb://user:password1@ds027489.mlab.com:27489/heroku_wrrcc7n1",
  {
    useMongoClient: true
  }
);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });