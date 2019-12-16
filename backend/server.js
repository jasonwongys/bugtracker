const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 4000;


// const bugRoutes = express.Router();
// let Bug = require('./bug.model');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bugs',{ useNewUrlParser: true})
const connection = mongoose.connection;

connection.once('open',function() {
    console.log("Mongo DB connected successfully");
})

const bugRouter = require('./routes/bug.routes');


app.use('/bugs', bugRouter);

app.listen(PORT, function() {
    console.log("Server is running on PORT: " + PORT);
});