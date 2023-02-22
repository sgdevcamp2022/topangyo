const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscription = mongoose.model("subscribers");

let userid;

router.post('/:id', async (req, res) => {
    console.log(req.params);
    userid = req.params.id;
    res.json({
        data: 'First value saved.'
    });
});

router.post("/", async (req, res) => {

  const model = {
    id: userid,
    endpoint: req.body.endpoint,
    keys: { p256dh: req.body.keys.p256dh, auth: req.body.keys.auth },
  };
  console.log(model);
  const subscriptionModel = new Subscription(model);
  subscriptionModel.save((err, subscription) => {
    if (err) {
      console.error(`Error occurred while saving subscription. Err: ${err}`);
      res.status(500).json({
        error: "Technical error occurred",
      });  console.log(userid);
  console.log(req.body.keys);
    } else {
      res.json({
        data: "Subscription saved.",
      });
    }
  });
});

router.get("/", (req, res) => {
  res.json({
    data: "Invalid Request Bad",
  });
});
module.exports = router;
