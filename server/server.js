if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};

const express = require('express');
const app = express();
const port = 9000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({msg: "Server is running!"});
});

const listsRouter = require("./routes/lists");
app.use("/lists", listsRouter);
const todoRouter = require("./routes/todo");
app.use("/todos", todoRouter);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});