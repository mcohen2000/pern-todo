if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};

const express = require('express');
const app = express();
const port = 9000;
const pool = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({msg: "Server is running!"});
});
// get all lists
app.get('/lists', async(req, res) => {
    try {
        const allLists = await pool.query("SELECT * from lists ORDER BY created");
        res.status(200).json(allLists.rows);
    } catch (error) {
        console.log(error);
    }
});
// create new list
app.post('/lists', async(req, res) => {
    try {
        const { created } = req.body;
        console.log("CREATE NEW LIST", created)
        // need to replace second argument with req.user_id
        const newList = await pool.query("INSERT INTO lists (title, user_email, created) VALUES ($1, $2, $3) RETURNING *", ["Unnamed List", "test@gmail.com", created]);        
        res.status(200).json(newList.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
// get all todos
app.get('/todos', async(req, res) => {
    try {
        // need to add WHERE user_id = req.user_id and second param with req.user_id
        const allTodos = await pool.query("SELECT * from todo ORDER BY created");
        res.status(200).json(allTodos);
    } catch (error) {
        console.log(error);
    }
});
// create new todo
app.post('/todos', async(req, res) => {
    try {
        const {text, list_id, created} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (text, list_id, created) VALUES($1, $2, $3) RETURNING *", [text, list_id, created]);
        res.status(200).json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
// update todo
app.patch('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {text, isComplete} = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET text = $1, iscomplete = $2 WHERE todo_id = $3 RETURNING *", [text, isComplete, id]);
        res.status(200).json(updatedTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
// delete todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.status(200).json("Todo Deleted");
    } catch (error) {
        console.log(error);
    }
});  

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});