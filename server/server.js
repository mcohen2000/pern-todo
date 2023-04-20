const express = require('express');
const app = express();
const port = 9000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({msg: "Server is running!"});
});  

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});