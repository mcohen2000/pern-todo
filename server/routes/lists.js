const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const lists = require("../controllers/lists");

router.route("/").get(catchAsync(lists.getLists)).post(catchAsync(lists.createList));

router.route("/:id").patch(catchAsync(lists.updateListName)).delete(catchAsync(lists.deleteList));

module.exports = router;