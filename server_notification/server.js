const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const corsOptions = require("./config/corsOptions");
require("./model/sub_model");
require("./model/noti_model");
const credentials = require("./middlewares/credentials");
const cors = require("cors");
const index = require("./controllers");
const push = require("./controllers/pushAllSubscriber");
const subscribe = require("./controllers/subscribe");
const unsubscribe = require("./controllers/unsubscribe");
const keys = require("./config/keys");
const notification = require("./controllers/getAllNotification");
const idnotification = require("./controllers/getUserNotification");
const { async } = require("q");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors(corsOptions));
app.use(credentials);
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/", index);
app.use("/subscribe", subscribe);
app.use("/unsubscribe", unsubscribe);
//app.use('/push', push);
app.use("/", require("./routes/notification"));
//app.use('/notifications',notification)
//app.use('/notification',idnotification)

//app.use('/notifications/:id',notification)

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

const port = process.env.PORT || 3800;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
