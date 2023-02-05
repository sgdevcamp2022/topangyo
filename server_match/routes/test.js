const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");

// router
router.post("/", testController.handleTest);

module.exports = router;
