const express = require("express");
const router = express.Router();

const registerController = require("../controllers/regiesterController");

// router
// router sample
router.post("/register", registerController.handleNewUserRegist);

module.exports = router;