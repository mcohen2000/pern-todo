const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const todo = require("../controllers/todo");
const { isLoggedIn } = require("../authenticateJWT");

router.route("/all").post(isLoggedIn, catchAsync(todo.getTodos))
router.route("/").post(isLoggedIn, catchAsync(todo.createTodo));

router.route("/:id").patch(isLoggedIn, catchAsync(todo.updateTodo)).delete(isLoggedIn, catchAsync(todo.deleteTodo));

module.exports = router;