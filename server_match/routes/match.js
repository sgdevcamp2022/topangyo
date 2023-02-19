const express = require("express");
const router = express.Router();

const createMatchController = require("../controllers/createMatchController");
const confirmMatchingController = require("../controllers/confirmMatchingController");
const setPlaceController = require("../controllers/setPlaceContorller");

// router
router.post("/", createMatchController.handleCreateMatch);
router.post("/confirm", confirmMatchingController.handleConfirmMatch);
router.post("/setPlace", setPlaceController.handlePlace);

module.exports = router;
