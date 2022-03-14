var express = require("express");
var router = express.Router();

const todos = [];

router.post("/", (req, res) => {
  const todo = req.body;
  todos.push(todo);
});

router.get("/", function (req, res, next) {
  res.send("Todo");
});

module.exports = router;
