const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const user = require("../controllers/user");
const { isLoggedIn } = require("../authenticateJWT");

router.route("/register").post(catchAsync(user.register));

router.route("/login").post(catchAsync(user.login));

router.route("/logout").post(isLoggedIn, catchAsync(user.logout));

router.route("/auth").post(isLoggedIn, catchAsync(user.auth));

module.exports = router;