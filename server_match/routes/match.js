const express = require("express");
const router = express.Router();

const createMatchController = require("../controllers/createMatchController");
const confirmMatchingController = require("../controllers/confirmMatchingController");

// router
router.post("/", createMatchController.handleCreateMatch);
router.post("/confirm", confirmMatchingController.handleConfirmMatch);
module.exports = router;
