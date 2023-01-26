const express = require("express");
const router = express.Router();
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const getUserController = require("../controllers/getUserController");
const getSpecificUserController = require("../controllers/getSpecificUserController");

// router
router.route("/users").get(verifyJwtToken, getUserController.handleGetUserInfo);
router
  .route(`/users/:userId`)
  .get(getSpecificUserController.handleSpecificUserInfo);

module.exports = router;
