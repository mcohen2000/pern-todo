const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const todo = require("../controllers/todo");

router.route("/").get(catchAsync(todo.getTodos)).post(catchAsync(todo.createTodo));

router.route("/:id").patch(catchAsync(todo.updateTodo)).delete(catchAsync(todo.deleteTodo));

module.exports = router;