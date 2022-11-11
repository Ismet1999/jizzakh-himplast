require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const router = require("./routes");
const { mongoose } = require("mongoose");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

function listen() {
  //   if (app.get("env") === "test") return;
  app.listen(port);
  console.log("Express app started on port " + port);
}

connect();

function connect() {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", listen);
  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
