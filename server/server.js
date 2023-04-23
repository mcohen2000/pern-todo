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
app.get('/lists', async(req, res) => {
    try {
        // const allTodos = await pool.query("SELECT * from todo");
        const allLists = await pool.query("SELECT * from lists");
        console.log(allLists);
        
        res.status(200).json(allLists);
    } catch (error) {
        console.log(error);
    }
});
app.post('/lists', async(req, res) => {
    try {
        // need to replace second params with req.user_id
        const newList = await pool.query("INSERT INTO lists (title, user_email) VALUES ($1, $2) RETURNING *", ["Unnamed List", "test@gmail.com"]);
        
        console.log(newList);
        
        res.status(200).json(newList.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
app.get('/todos', async(req, res) => {
    try {
        // need to add WHERE user_id = req.user_id and second param with req.user_id
        const allTodos = await pool.query("SELECT * from todo");
        
        res.status(200).json(allTodos);
    } catch (error) {
        console.log(error);
    }
});
app.post('/todos', async(req, res) => {
    try {
        console.log("POST TO DO");
        const {text , list_id} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (text, list_id) VALUES($1, $2) RETURNING *", [text, list_id]);
        console.log(newTodo);
        
        res.status(200).json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
// console.log(process.env.PGUSER)  

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});