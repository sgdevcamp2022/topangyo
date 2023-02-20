const express = require("express");
const router = express.Router();

const createMatchController = require("../controllers/createMatchController");
const confirmMatchingController = require("../controllers/confirmMatchingController");
const setPlaceController = require("../controllers/setPlaceContorller");
const getMatchedMembersController = require("../controllers/getMatchedMembersControllers");

// router
router.post("/", createMatchController.handleCreateMatch);
router.post("/confirm", confirmMatchingController.handleConfirmMatch);
router.post("/setPlace", setPlaceController.handlePlace);
router.post(
  "/membersList",
  getMatchedMembersController.handleMatchedMembersList
);

module.exports = router;
