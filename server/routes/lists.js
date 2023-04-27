const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const lists = require("../controllers/lists");
const { isLoggedIn } = require("../authenticateJWT");

router.route("/").get(isLoggedIn, catchAsync(lists.getLists)).post(isLoggedIn, catchAsync(lists.createList));

router.route("/:id").patch(isLoggedIn, catchAsync(lists.updateListName)).delete(isLoggedIn, catchAsync(lists.deleteList));

module.exports = router;