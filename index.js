const express = require("express");

const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const isAuth = require("./middlewares/isAuth");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,  DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});
app.use(bodyParser.json());
app.use(authRoutes);
app.use(isAuth, blogRoutes);
mongoose
  .connect(
    "mongodb+srv://mynode:mynode@cluster0.jf4vffa.mongodb.net/anwar?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server Starting>>>>");
      console.log("db Connection established");
    });
  })
  .catch((error) => {
    console.log(error);
  });
