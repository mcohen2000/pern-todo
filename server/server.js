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
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * from todo");
        console.log(allTodos);
        
        res.status(200).json(allTodos);
    } catch (error) {
        console.log(error);
    }
});
app.post('/todos', async(req, res) => {
    try {
        console.log("POST TO DO");
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", ["test todo"]);
        console.log(newTodo);
        
        res.status(200).json({...newTodo});
    } catch (error) {
        console.log(error);
    }
});
// console.log(process.env.PGUSER)  

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});