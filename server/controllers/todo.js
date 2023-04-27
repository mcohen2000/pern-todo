const pool = require('../db');

module.exports.getTodos = async (req, res) => {
  try {
    // need to add WHERE user_id = req.user_id and second param with req.user_id
    const allTodos = await pool.query("SELECT * from todo WHERE user_id = $1 ORDER BY created", [req.user.id]);
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
  }
};
module.exports.createTodo = async (req, res) => {
  try {
    const { text, list_id, created } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (text, list_id, user_id, created) VALUES($1, $2, $3, $4) RETURNING *",
      [text, list_id, req.user.id, created]
    );
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
module.exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isComplete } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET text = $1, iscomplete = $2 WHERE todo_id = $3 RETURNING *",
      [text, isComplete, id]
    );
    res.status(200).json(updatedTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.status(200).json("Todo Deleted");
  } catch (error) {
    console.log(error);
  }
};
