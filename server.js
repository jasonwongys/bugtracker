const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000;
const passport = require('passport');
const path = require("path");

const secret = process.env.SECRET || "jasonwongysLocal"
require("dotenv").config()



mongoose.Promise = global.Promise;
// const bugRoutes = express.Router();
// let Bug = require('./bug.model');

app.use(express.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bugs',{ useNewUrlParser: true})
const connection = mongoose.connection;

//const db = require("./config/keys").mongoURI;

// mongoose
//     .connect(
//         db,
//         { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch( err => console.log(err));


connection.once('open',function() {
    console.log("Mongo DB connected successfully");
})

const bugRouter = require('./routes/bug.routes');
const users = require("./routes/api/users");
const projectRouter = require('./routes/project.routes');

app.use(passport.initialize());


require("./config/passport")(passport);

app.use('/projects',projectRouter);
app.use('/api/users/', users);
app.use('/bugs', bugRouter);


//const port = process.env.PORT || 5000
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT, function() {
    console.log("Server is running on PORT: " + PORT);
});