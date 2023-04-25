const pool = require('../db');

module.exports.getLists = async (req, res) => {
  try {
    const allLists = await pool.query("SELECT * from lists ORDER BY created");
    res.status(200).json(allLists.rows);
  } catch (error) {
    console.log(error);
  }
};
module.exports.createList = async (req, res) => {
  try {
    const { created } = req.body;
    // need to replace second argument with req.user_id
    const newList = await pool.query(
      "INSERT INTO lists (title, user_email, created) VALUES ($1, $2, $3) RETURNING *",
      ["Unnamed List", "test@gmail.com", created]
    );
    res.status(200).json(newList.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
module.exports.updateListName = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE lists SET title = $1 WHERE list_id = $2 RETURNING *",
      [title, id]
    );
    res.status(200).json(updatedTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await pool.query(
      "DELETE FROM lists WHERE list_id = $1",
      [id]
    );
    res.status(200).json("List Deleted");
  } catch (error) {
    console.log(error);
  }
};
