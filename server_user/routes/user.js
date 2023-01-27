const express = require("express");
const router = express.Router();
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const getUserController = require("../controllers/getUserController");
const getSpecificUserController = require("../controllers/getSpecificUserController");
const updateUserController = require("../controllers/updateUserController");

// router
router
  .route("/users")
  .get(verifyJwtToken, getUserController.handleGetUserInfo)
  .put(verifyJwtToken, updateUserController.handleUpdateUserInfo);
router
  .route(`/users/:userId`)
  .get(getSpecificUserController.handleSpecificUserInfo);

module.exports = router;
