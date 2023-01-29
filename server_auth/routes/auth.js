const express = require("express");
const router = express.Router();

const registerController = require("../controllers/regiesterController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const tokenInfoController = require("../controllers/tokenInfoController");
const tokenRefreshController = require("../controllers/tokenRefreshController");

// router
router.post("/register", registerController.handleNewUserRegist);
router.post("/login", loginController.handleLogin);
router.post("/logout", logoutController.handleLogout);
router.get("/token_info", tokenInfoController.handleTokenInfo);
router.get("/token_refresh", tokenRefreshController.handleTokenRefresh);

module.exports = router;
